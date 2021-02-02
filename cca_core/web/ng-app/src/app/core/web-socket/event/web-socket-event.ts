export interface WebSocketEvent<T> {

  content: T;
  type: WebSocketEventType;
}

export enum WebSocketEventType {
  AUTO_WRAPPED       = 'auto-wrapped',
  CALL_CONNECT       = 'call-connect',
  CALL_DISCONNECT    = 'call-disconnect',
  REFRESH_CODEX      = 'refresh-codex',
  REFRESH_DICTIONARY = 'refresh-dictionary'
}
