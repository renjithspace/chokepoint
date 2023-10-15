export interface ChockpointNode {
  host: string;
  port: number;
}

export default abstract class Method {
  protected nodes: ChockpointNode[];
  protected index: number;

  constructor(nodes: ChockpointNode[]) {
    if (nodes.length === 0) throw new Error("No chockpoint nodes provided");
    this.nodes = nodes;
    this.index = 0;
  }

  abstract node(): ChockpointNode;
}
