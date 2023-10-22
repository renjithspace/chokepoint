import http, {
  IncomingMessage,
  Server as HttpServer,
  ServerResponse,
} from "http";

export type ServerListenCallback = () => void;
type ServerCreateCallback = (req: IncomingMessage, res: ServerResponse) => void;

export default class Server {
  private server: HttpServer;

  constructor(callback: ServerCreateCallback) {
    this.server = http.createServer(callback);
  }

  public listen(port: number, callback: ServerListenCallback) {
    this.server.listen(port, callback);
  }
}
