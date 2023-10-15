### Chokepoint
Chokepoint is a powerful Node.js package designed to streamline load balancing in your applications. It distributes incoming traffic across multiple nodes using Round Robin algorithm, ensuring optimal resource utilization and enhanced performance.

### Usage
```ts
import Chokepoint from "chokepoint";

const nodes = [
  { host: "localhost", port: 8001 },
  { host: "localhost", port: 8002 },
  { host: "localhost", port: 8003 },
];
const chokepoint = new Chokepoint(nodes);

chokepoint.listen(8000, () => {
  console.log("Load balancer is running");
});
```