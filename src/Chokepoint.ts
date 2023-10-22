import Server, { ServerListenCallback } from "./Server";
import Proxy from "./Proxy";
import RoundRobin, { Node } from "./RoundRobin";

export default class Chokepoint {
  private nodes: Node[];

  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  listen(port: number, callback: ServerListenCallback) {
    const roundRobin = new RoundRobin(this.nodes);
    const server = new Server((request, response) => {
      const proxy = new Proxy(request, response);
      const node = roundRobin.node();
      proxy.route(node);
    });
    server.listen(port, callback);
  }
}
