import { Action } from "@ngrx/store";
import { SupportActionType } from "./support-action-type.enum";
import { PayloadAction } from "../payload-action";
import { BalanceAdjustmentActivity } from "../auth/balance-adjustment-activity";
import { Partner } from "../session/selection/partner";
import { PlatformStatusValue } from "../platform/platform-status-value";
import { Property } from "../model/property";
import { SessionClass } from "../session/model/session-class";
import { Team } from "../auth/team";
import { ProductDescriptionContainer } from "../product-description/product-description";
import { IdentificationType } from "../customer/identification-type";
import { Occupation } from "../customer/occupation";
import { PlatformType } from "../platform/platform-type.enum";
import { ProductActionReasonCode } from "../action/product-action-reason-code";
import { VersionAndEnvironmentView } from "../canary/version-and-environment-view";
import {TogglzFeature} from '../config/togglz-feature';

export class ClearSupportStateAction implements Action {
  type = SupportActionType.CLEAR_STATE;
}

export class LoadBalanceAdjustmentActivityAction implements PayloadAction {
  payload: BalanceAdjustmentActivity;
  type = SupportActionType.LOAD_BALANCE_ADJUSTMENT_ACTIVITY;

  constructor ( balanceAdjustmentActivity: BalanceAdjustmentActivity ) {
    this.payload = balanceAdjustmentActivity;
  }
}

export class LoadCanaryInfoAction implements PayloadAction {
  payload: VersionAndEnvironmentView;
  type = SupportActionType.LOAD_CANARY_INFO;

  constructor ( payload: VersionAndEnvironmentView ) {
    this.payload = payload;
  }
}

export class LoadIdentificationTypesAction implements PayloadAction {
  payload: IdentificationType[];
  type = SupportActionType.LOAD_IDENTIFICATION_TYPES;

  constructor ( payload: IdentificationType[] ) {
    this.payload = payload;
  }
}

export class LoadOccupationsAction implements PayloadAction {
  payload: Occupation[];
  type = SupportActionType.LOAD_OCCUPATIONS;

  constructor ( payload: Occupation[] ) {
    this.payload = payload;
  }
}

export class LoadPartnersAction implements PayloadAction {
  payload: Partner[];
  type = SupportActionType.LOAD_PARTNERS;

  constructor ( partners: Partner[] ) {
    this.payload = partners;
  }
}

export class LoadPlatformStatusValuesAction implements PayloadAction {
  payload: PlatformStatusValue[];
  type = SupportActionType.LOAD_PLATFORM_STATUS_VALUES;

  constructor ( payload: PlatformStatusValue[] ) {
    this.payload = payload;
  }
}

export class LoadPropertiesAction implements PayloadAction {
  payload: Property[];
  type = SupportActionType.LOAD_PROPERTIES;

  constructor ( properties: Property[] ) {
    this.payload = properties;
  }
}

export class LoadSessionDefinitionsAction implements PayloadAction {
  payload: SessionClass[];
  type = SupportActionType.LOAD_SESSION_DEFINITIONS;

  constructor ( definitions: SessionClass[] ) {
    this.payload = definitions;
  }
}

export class LoadTeamsAction implements PayloadAction {
  payload: Team[];
  type = SupportActionType.LOAD_TEAMS;

  constructor ( teams: Team[] ) {
    this.payload = teams;
  }
}

export class LoadTogglzAction implements PayloadAction {
  payload: Map<string, TogglzFeature>;
  type = SupportActionType.LOAD_TOGGLZ;

  constructor ( togglz: Map<string, TogglzFeature> ) {
    this.payload = togglz;
  }
}

export class ResetSessionTimeoutAction implements Action {
  type = SupportActionType.RESET_SESSION_TIMEOUT;
}

export class SetIsSupportInitCompleteAction implements Action {
  type = SupportActionType.SET_INIT_COMPLETE;
}

export class SetProductDescriptionContainerAction implements PayloadAction {
  payload: ProductDescriptionContainer;
  type = SupportActionType.SET_PRODUCT_DESCRIPTION_CONTAINER;

  constructor ( payload: ProductDescriptionContainer ) {
    this.payload = payload;
  }
}

export class SetProductReasonCodesAction implements PayloadAction {
  payload: ProductActionReasonCode[];
  platform: PlatformType;
  type = SupportActionType.SET_PRODUCT_REASON_CODES;

  constructor ( payload: ProductActionReasonCode[], platform: PlatformType ) {
    this.payload  = payload;
    this.platform = platform;
  }
}
