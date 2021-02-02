import * as _ from 'lodash';
import { SupportState } from './support-state';
import { PayloadAction } from '../payload-action';
import { SupportActionType } from './support-action-type.enum';
import { ProductDescriptionContainer } from '../product-description/product-description';
import { PlatformType } from '../platform/platform-type.enum';
import { PlatformStatusValue } from '../platform/platform-status-value';
import { ProductActionReasonCode } from '../action/product-action-reason-code';
import { SetProductReasonCodesAction } from './support-actions';
import {TogglzFeature} from '../config/togglz-feature';

export const DEFAULT_SUPPORT_STATE: SupportState = {
  balanceAdjustmentActivity: null,
  canaryInfo: null,
  identificationTypes: [],
  isInitComplete: false,
  occupations: [],
  partners: [],
  platformStatusValues: new Map<PlatformType, PlatformStatusValue[]> (),
  productActionReasonCodes: new Map<PlatformType, ProductActionReasonCode[]> (),
  productDescriptionContainers: [],
  properties: [],
  sessionDefinitions: [],
  sessionTimeout: null,
  teams: [],
  togglz: new Map<string, TogglzFeature> ()
};

export function supportReducer ( state: SupportState = DEFAULT_SUPPORT_STATE, action: PayloadAction ): SupportState {
  let newState: SupportState;

  switch ( action.type ) {
    case SupportActionType.CLEAR_STATE:
      newState = DEFAULT_SUPPORT_STATE;
      break;
    case SupportActionType.LOAD_BALANCE_ADJUSTMENT_ACTIVITY:
      newState = {
        ...state,
        balanceAdjustmentActivity: action.payload
      };
      break;
    case SupportActionType.LOAD_CANARY_INFO:
      newState = {
        ...state,
        canaryInfo: action.payload
      };
      break;
    case SupportActionType.LOAD_PARTNERS:
      newState = {
        ...state,
        partners: action.payload
      };
      break;
    case SupportActionType.LOAD_PLATFORM_STATUS_VALUES:
      newState = {
        ...state
      };

      if ( action.payload.length ) {
        let platform = action.payload[ 0 ].platform;
        newState.platformStatusValues.set ( platform, [ ...action.payload ] );
      }

      break;
    case SupportActionType.LOAD_PROPERTIES:
      newState = {
        ...state,
        properties: action.payload
      };
      break;
    case SupportActionType.LOAD_SESSION_DEFINITIONS:
      newState = {
        ...state,
        sessionDefinitions: action.payload
      };
      break;
    case SupportActionType.LOAD_TEAMS:
      newState = {
        ...state,
        teams: action.payload
      };
      break;
    case SupportActionType.LOAD_TOGGLZ:
      newState = {
        ...state,
        togglz: action.payload
      };
      break;

    case SupportActionType.RESET_SESSION_TIMEOUT:
      newState = {
        ...state,
        sessionTimeout: new Date ( new Date ().getTime () + (1000 * 60 * 58) ) // 58 minutes from now
      };
      break;
    case SupportActionType.SET_INIT_COMPLETE:
      newState = {
        ...state,
        isInitComplete: true
      };
      break;
    case SupportActionType.SET_PRODUCT_DESCRIPTION_CONTAINER:
      newState = {
        ...state
      };

      let index = _.findIndex ( newState.productDescriptionContainers, ( container: ProductDescriptionContainer ) => {
        return container.platform === action.payload.platform;
      } );
      if ( index >= 0 ) {
        newState.productDescriptionContainers[ index ] = action.payload;
      } else {
        newState.productDescriptionContainers.push ( action.payload );
      }
      break;
    case SupportActionType.SET_PRODUCT_REASON_CODES:
      newState = {
        ...state
      };

      newState.productActionReasonCodes.set ( (<SetProductReasonCodesAction>action).platform, action.payload );
      break;
    default:
      newState = state;
      break;
  }

  return newState;

}
