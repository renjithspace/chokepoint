import http from "http";
import RoundRobin from "./RoundRobin";

export type ChokepointListenCallback = () => void;

export interface ChokepointNode {
  host: string;
  port: number;
}

export default class Chokepoint {
  private roundRobin: RoundRobin;

  constructor(nodes: ChokepointNode[]) {
    this.roundRobin = new RoundRobin(nodes);
  }

  listen(port: number, callback: ChokepointListenCallback) {
    const server = http.createServer((request, response) => {
      const node = this.roundRobin.node();
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
        response.writeHead(503, header);
        const message = `${node.host}:${node.port} inactive: ${error.message}`;
        const output = JSON.stringify({ message });
        response.end(output);
      });
    });
    server.listen(port, callback);
  }
}
