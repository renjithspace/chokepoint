import { SecureContextOptions } from "tls";
import Server, { ServerListenCallback } from "./Server";
import Proxy from "./Proxy";
import RoundRobin, { Node } from "./RoundRobin";

export default class Chokepoint {
  private nodes: Node[];
  private secureOptions?: SecureContextOptions;

  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  secure(options: SecureContextOptions) {
    this.secureOptions = options;
  }

  listen(port: number, callback: ServerListenCallback) {
    const roundRobin = new RoundRobin(this.nodes);
    const server = new Server((request, response) => {
      const proxy = new Proxy(request, response, this.secureOptions);
      const node = roundRobin.node();
      proxy.route(node);
    }, this.secureOptions);
    server.listen(port, callback);
  }
}
