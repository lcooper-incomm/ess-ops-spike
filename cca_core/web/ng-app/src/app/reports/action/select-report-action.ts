import { PayloadAction } from "../../core/payload-action";
import { ReportActionType } from "./report-action-type.enum";

export class SelectReportAction implements PayloadAction {

  payload: string;
  type = ReportActionType.SELECT_REPORT;

  constructor ( payload: string ) {
    this.payload = payload;
  }
}
