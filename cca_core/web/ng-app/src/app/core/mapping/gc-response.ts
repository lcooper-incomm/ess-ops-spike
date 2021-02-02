
export class GCResponse {
  id: number;
  responseCode: string;
  responseValue: string;

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
