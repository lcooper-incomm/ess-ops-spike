import { WebSocketEvent, WebSocketEventType } from "./web-socket-event";
import { Session } from "../../session/model/session";

export class CallConnectEvent implements WebSocketEvent<Session> {

  content: Session;
  type: WebSocketEventType = WebSocketEventType.CALL_CONNECT;

  constructor ( data: any ) {
    this.content = data;
  }
}
