### Chokepoint
Chokepoint is a powerful Node.js package designed to streamline load balancing in your applications. It distributes incoming traffic across multiple nodes using Round Robin algorithm, ensuring optimal resource utilization and enhanced performance.

![NPM](https://img.shields.io/npm/l/chokepoint) ![npm](https://img.shields.io/npm/v/chokepoint) ![GitHub contributors](https://img.shields.io/github/contributors/renjithspace/chokepoint) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/renjithspace/chokepoint/main) ![npm](https://img.shields.io/npm/dw/chokepoint)

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

🚀 Excited to kickstart this project! Your support means the world to us. Please give us a star ⭐️ on GitHub to show your encouragement and help us grow! Let's build something amazing together! 🌟