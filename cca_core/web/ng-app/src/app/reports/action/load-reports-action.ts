import { PayloadAction } from "../../core/payload-action";
import { ReportActionType } from "./report-action-type.enum";
import { Report } from "../report";

export class LoadReportsAction implements PayloadAction {

  payload: Report[];
  type = ReportActionType.LOAD_REPORTS;

  constructor ( payload: Report[] ) {
    this.payload = payload;
  }
}
