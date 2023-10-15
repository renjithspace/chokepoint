import Method, { ChockpointNode } from "./Method";
import RoundRobinMethod from "./methods/RoundRobinMethod";

export enum ChockpointMethod {
  roundRobin = "roundRobin",
}

export default class MethodFactory {
  constructor(private method: ChockpointMethod) {}

  create(nodes: ChockpointNode[]): Method {
    switch (this.method) {
      default:
        return new RoundRobinMethod(nodes);
    }
  }
}
