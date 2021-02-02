import { PayloadAction } from "../core/payload-action";
import { SummaryModeType } from "../core/user/summary-mode-type.enum";
import { DetailActionType } from "./detail-action-type.enum";

export class SetDetailSummaryModeAction implements PayloadAction {
  payload: SummaryModeType;
  type = DetailActionType.SET_SUMMARY_MODE;

  constructor ( payload: SummaryModeType ) {
    this.payload = payload;
  }
}
