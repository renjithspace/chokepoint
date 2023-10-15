import Method, { ChokepointNode } from "../Method";

export default class RoundRobinMethod extends Method {
  constructor(nodes: ChokepointNode[]) {
    super(nodes);
  }

  node(): ChokepointNode {
    const node = this.nodes[this.index];
    this.index = (this.index + 1) % this.nodes.length;
    return node;
  }
}
