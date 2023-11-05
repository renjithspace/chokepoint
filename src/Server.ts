import http, {
  Server as HttpServer,
  IncomingMessage,
  ServerResponse,
} from "http";
import https from "https";
import { SecureContextOptions } from "tls";

export type ServerListenCallback = () => void;
type ServerCreateCallback = (req: IncomingMessage, res: ServerResponse) => void;

export default class Server {
  private server: HttpServer;

  constructor(
    callback: ServerCreateCallback,
    secureOptions?: SecureContextOptions
  ) {
    this.server = secureOptions
      ? https.createServer(secureOptions, callback)
      : http.createServer(callback);
  }

  public listen(port: number, callback: ServerListenCallback) {
    this.server.listen(port, callback);
  }
}
