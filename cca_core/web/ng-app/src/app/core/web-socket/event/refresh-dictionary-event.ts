import {WebSocketEvent, WebSocketEventType} from './web-socket-event';

export class RefreshDictionaryEvent implements WebSocketEvent<any> {

  content: any;
  type: WebSocketEventType = WebSocketEventType.REFRESH_DICTIONARY;

  constructor() {
  }
}
