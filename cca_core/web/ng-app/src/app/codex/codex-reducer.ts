import { CodexState } from "./codex-state";
import { PayloadAction } from "../core/payload-action";
import { CodexActionType } from "./action/codex-action-type.enum";
import { Codex } from "@cscore/codex";

export const DEFAULT_CODEX_STATE: CodexState = {
  codexIndex: new Map<string, Codex> ()
};

export function codexReducer ( state: CodexState = DEFAULT_CODEX_STATE, action: PayloadAction ): CodexState {
  let newState: CodexState;

  switch ( action.type ) {
    case CodexActionType.CLEAR_STATE:
      newState = DEFAULT_CODEX_STATE;
      break;
    case CodexActionType.LOAD_CODEX:
      newState = {
        ...state
      };
      newState.codexIndex.set ( action.payload.name, action.payload );
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
