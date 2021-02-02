import { CodexActionType } from "./codex-action-type.enum";
import { PayloadAction } from "../../core/payload-action";
import { Codex } from "@cscore/codex";

export class LoadCodexAction implements PayloadAction {

  payload: Codex;
  type = CodexActionType.LOAD_CODEX;

  constructor ( payload: Codex ) {
    this.payload = payload;
  }
}
