### Chockpoint
Node.js load balance

### Usage
```js
import Chockpoint from "chockpoint";

const chockpoint = new Chockpoint(
  [
    { host: "localhost", port: 8001 },
    { host: "localhost", port: 8002 },
    { host: "localhost", port: 8003 },
  ],
  "roundRobin"
);

chockpoint.listen(8000, () => {
  console.log("Load balancer is running");
});
```