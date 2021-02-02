import { Action } from "@ngrx/store";
import { CodexActionType } from "./codex-action-type.enum";

export class ClearCodexStateAction implements Action {

  type = CodexActionType.CLEAR_STATE;
}
