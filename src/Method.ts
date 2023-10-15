export interface ChokepointNode {
  host: string;
  port: number;
}

export default abstract class Method {
  protected nodes: ChokepointNode[];
  protected index: number;

  constructor(nodes: ChokepointNode[]) {
    if (nodes.length === 0) throw new Error("No chokepoint nodes provided");
    this.nodes = nodes;
    this.index = 0;
  }

  abstract node(): ChokepointNode;
}
