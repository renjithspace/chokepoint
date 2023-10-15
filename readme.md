### Chokepoint
Node.js load balancer

### Usage
```js
import Chokepoint from "chokepoint";

const chokepoint = new Chokepoint(
  [
    { host: "localhost", port: 8001 },
    { host: "localhost", port: 8002 },
    { host: "localhost", port: 8003 },
  ],
  "roundRobin"
);

chokepoint.listen(8000, () => {
  console.log("Load balancer is running");
});
```