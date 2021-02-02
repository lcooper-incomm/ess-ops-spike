import { ToastState } from "./toast-state";
import { ToastActionType } from "./action/toast-action-type.enum";
import { PayloadAction } from "../core/payload-action";
import * as _ from "lodash";
import { Toast } from "./toast";

export const DEFAULT_TOAST_STATE: ToastState = {
  toasts: []
};

export function toastReducer ( state: ToastState = DEFAULT_TOAST_STATE, action: PayloadAction ): ToastState {
  let newState: ToastState;

  switch ( action.type ) {
    case ToastActionType.CLEAR_ALL:
      newState = {
        ...state,
        toasts: []
      };
      break;
    case ToastActionType.CLEAR_STATE:
      newState = DEFAULT_TOAST_STATE;
      break;
    case ToastActionType.CLEAR_TOAST:
      state.toasts = _.reject ( state.toasts, function ( toast: Toast ) {
        return toast.id === action.payload.id;
      } );

      newState = {
        ...state
      };
      break;
    case ToastActionType.NEW_TOAST:
      // Prevent the same toast from spamming.  Remove old toast of same type and message, new toast will have reset timer.
      state.toasts = _.reject ( state.toasts, function ( toast: Toast ) {
        return toast.type === action.payload.type && toast.message === action.payload.message;
      } );

      newState = {
        ...state
      };
      newState.toasts.push ( action.payload );
      break;
    default:
      newState = state;
      break;
  }

  return newState;

}
