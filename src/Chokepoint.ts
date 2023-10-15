import http from "http";
import Method, { ChokepointNode } from "./Method";
import MethodFactory, { ChokepointMethod } from "./MethodFactory";

type ChokepointListenCallback = () => void;

export default class Chokepoint {
  private method: Method;

  constructor(nodes: ChokepointNode[], method: ChokepointMethod) {
    this.method = new MethodFactory(method).create(nodes);
  }

  listen(port: number, callback: ChokepointListenCallback) {
    const server = http.createServer((request, response) => {
      const node = this.method.node();
      const proxyOptions = {
        hostname: node.host,
        port: node.port,
        path: request.url,
        method: request.method,
        headers: request.headers,
      };
      const proxyRequest = http.request(proxyOptions, (proxyResponse) => {
        if (proxyResponse.statusCode) {
          response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
          proxyResponse.pipe(response, { end: true });
        }
      });
      request.pipe(proxyRequest, { end: true });
      proxyRequest.on("error", (error) => {
        const header = { "Content-Type": "application/json" };
        response.writeHead(500, header);
        const message = `No response from ${node.host}:${node.port}: ${error.message}`;
        const output = JSON.stringify({ error: { message } });
        response.end(output);
      });
    });
    server.listen(port, callback);
  }
}
