import { WebSocketEvent, WebSocketEventType } from "./web-socket-event";
import { Session } from "../../session/model/session";

export class CallDisconnectEvent implements WebSocketEvent<Session> {

  content: Session;
  type: WebSocketEventType = WebSocketEventType.CALL_DISCONNECT;

  constructor ( data: any ) {
    this.content = data;
  }
}
