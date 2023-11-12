### Chokepoint
Chokepoint is a powerful Node.js package designed to streamline HTTP/HTTPS load balancing in your applications. It distributes incoming traffic across multiple nodes using Round Robin algorithm, ensuring optimal resource utilization and enhanced performance.

![NPM](https://img.shields.io/npm/l/chokepoint) ![npm](https://img.shields.io/npm/v/chokepoint) ![GitHub contributors](https://img.shields.io/github/contributors/renjithspace/chokepoint) ![GitHub last commit (branch)](https://img.shields.io/github/last-commit/renjithspace/chokepoint/main) ![npm](https://img.shields.io/npm/dw/chokepoint)

### HTTP load balancing
```ts
import Chokepoint from "chokepoint";

const nodes = [
  { host: "localhost", port: 8001 },
  { host: "localhost", port: 8002 },
  { host: "localhost", port: 8003 },
];
const chokepoint = new Chokepoint(nodes);

chokepoint.listen(80, () => {
  console.log("Load balancer is running");
});
```

### HTTPS load balancing
```ts
import Chokepoint from "chokepoint";

const nodes = [
  { host: "localhost", port: 8001 },
  { host: "localhost", port: 8002 },
  { host: "localhost", port: 8003 },
];
const chokepoint = new Chokepoint(nodes);

// Configure SSL certificate before listen
chokepoint.secure({
  key: fs.readFileSync("./ssl-key.pem"),
  cert: fs.readFileSync("./ssl-cert.pem"),
});

chokepoint.listen(443, () => {
  console.log("Secure load balancer is running");
});
```

### Enable CORS
```ts
import Chokepoint from "chokepoint";

const nodes = [
  { host: "localhost", port: 8001 },
  { host: "localhost", port: 8002 },
  { host: "localhost", port: 8003 },
];
const chokepoint = new Chokepoint(nodes);

// Enable CORS for your request origins before listen
chokepoint.cors(["https://example.com"]);

chokepoint.listen(80, () => {
  console.log("Load balancer is running");
});
```

🚀 Excited to kickstart this project! Your support means the world to us. Please give us a star ⭐️ on GitHub to show your encouragement and help us grow! Let's build something amazing together! 🌟