import { SecureContextOptions } from "tls";
import Server, { ServerListenCallback } from "./Server";
import Proxy from "./Proxy";
import RoundRobin, { Node } from "./RoundRobin";

export default class Chokepoint {
  private nodes: Node[];
  private secureOptions?: SecureContextOptions;
  private corsHosts?: string[];

  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  cors(hosts: string[]) {
    this.corsHosts = hosts;
  }

  secure(options: SecureContextOptions) {
    this.secureOptions = options;
  }

  listen(port: number, callback: ServerListenCallback) {
    const roundRobin = new RoundRobin(this.nodes);
    const server = new Server((request, response) => {
      const proxy = new Proxy(
        request,
        response,
        this.secureOptions,
        this.corsHosts
      );
      const node = roundRobin.node();
      proxy.route(node);
    }, this.secureOptions);
    server.listen(port, callback);
  }
}
