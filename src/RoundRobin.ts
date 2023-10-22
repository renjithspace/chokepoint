export interface Node {
  host: string;
  port: number;
}

export default class RoundRobin {
  private nodes: Node[];
  private index: number;

  constructor(nodes: Node[]) {
    if (nodes.length === 0) throw new Error("No chokepoint nodes provided");
    this.nodes = nodes;
    this.index = 0;
  }

  node(): Node {
    const node = this.nodes[this.index];
    this.index = (this.index + 1) % this.nodes.length;
    return node;
  }
}
