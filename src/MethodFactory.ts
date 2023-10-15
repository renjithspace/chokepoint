import Method, { ChokepointNode } from "./Method";
import RoundRobinMethod from "./methods/RoundRobinMethod";

export enum ChokepointMethod {
  roundRobin = "roundRobin",
}

export default class MethodFactory {
  constructor(private method: ChokepointMethod) {}

  create(nodes: ChokepointNode[]): Method {
    switch (this.method) {
      default:
        return new RoundRobinMethod(nodes);
    }
  }
}
