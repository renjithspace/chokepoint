import Method, { ChockpointNode } from "../Method";

export default class RoundRobinMethod extends Method {
  constructor(nodes: ChockpointNode[]) {
    super(nodes);
  }

  node(): ChockpointNode {
    const node = this.nodes[this.index];
    this.index = (this.index + 1) % this.nodes.length;
    return node;
  }
}
