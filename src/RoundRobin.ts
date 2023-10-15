import { ChokepointNode } from "./Chokepoint";

export default class RoundRobin {
  private nodes: ChokepointNode[];
  private index: number;

  constructor(nodes: ChokepointNode[]) {
    if (nodes.length === 0) throw new Error("No chokepoint nodes provided");
    this.nodes = nodes;
    this.index = 0;
  }

  node(): ChokepointNode {
    const node = this.nodes[this.index];
    this.index = (this.index + 1) % this.nodes.length;
    return node;
  }
}
