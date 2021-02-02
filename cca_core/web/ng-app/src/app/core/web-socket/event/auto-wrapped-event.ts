import { WebSocketEvent, WebSocketEventType } from "./web-socket-event";
import { Session } from "../../session/model/session";

export class AutoWrappedEvent implements WebSocketEvent<Session> {

  content: Session;
  type: WebSocketEventType = WebSocketEventType.AUTO_WRAPPED;

  constructor ( data: any ) {
    this.content = data;
  }
}
