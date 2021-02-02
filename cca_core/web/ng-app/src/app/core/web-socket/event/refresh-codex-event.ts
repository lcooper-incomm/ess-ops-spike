import { WebSocketEvent, WebSocketEventType } from "./web-socket-event";
import { Codex } from "@cscore/codex";

export class RefreshCodexEvent implements WebSocketEvent<Codex> {

  content: Codex;
  type: WebSocketEventType = WebSocketEventType.REFRESH_CODEX;

  constructor ( data: any ) {
    this.content = data;
  }
}
