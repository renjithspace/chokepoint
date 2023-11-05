import https from "https";
import http, { IncomingMessage, ServerResponse } from "http";
import { SecureContextOptions } from "tls";
import { Node } from "./RoundRobin";

export default class Proxy {
  private request: IncomingMessage;
  private response: ServerResponse;
  private secureOptions?: SecureContextOptions;

  constructor(
    request: IncomingMessage,
    response: ServerResponse,
    secureOptions?: SecureContextOptions
  ) {
    this.request = request;
    this.response = response;
    this.secureOptions = secureOptions;
  }

  route(node: Node) {
    const proxyOptions = {
      hostname: node.host,
      port: node.port,
      path: this.request.url,
      method: this.request.method,
      headers: this.request.headers,
    };
    const protocol = this.secureOptions ? https : http;
    const proxyRequest = protocol.request(proxyOptions, (proxyResponse) => {
      if (proxyResponse.statusCode) {
        this.response.writeHead(
          proxyResponse.statusCode,
          proxyResponse.headers
        );
        proxyResponse.pipe(this.response, { end: true });
      }
    });
    this.request.pipe(proxyRequest, { end: true });
    proxyRequest.on("error", (error) => {
      const header = { "Content-Type": "application/json" };
      this.response.writeHead(503, header);
      const message = `${node.host}:${node.port} inactive: ${error.message}`;
      const output = JSON.stringify({ message });
      this.response.end(output);
    });
  }
}
