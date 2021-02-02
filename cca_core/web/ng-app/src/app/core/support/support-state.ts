import { Property } from "../model/property";
import { BalanceAdjustmentActivity } from "../auth/balance-adjustment-activity";
import { Partner } from "../session/selection/partner";
import { SessionClass } from "../session/model/session-class";
import { Team } from "../auth/team";
import { ProductDescriptionContainer } from "../product-description/product-description";
import { PlatformStatusValue } from "../platform/platform-status-value";
import { PlatformType } from "../platform/platform-type.enum";
import { IdentificationType } from "../customer/identification-type";
import { Occupation } from "../customer/occupation";
import { ProductActionReasonCode } from "../action/product-action-reason-code";
import { VersionAndEnvironmentView } from "../canary/version-and-environment-view";
import {TogglzFeature} from '../config/togglz-feature';

export class SupportState {

  balanceAdjustmentActivity: BalanceAdjustmentActivity;
  canaryInfo: VersionAndEnvironmentView;
  identificationTypes: IdentificationType[];
  isInitComplete: boolean;
  occupations: Occupation[];
  partners: Partner[];
  platformStatusValues: Map<PlatformType, PlatformStatusValue[]>;
  productActionReasonCodes: Map<PlatformType, ProductActionReasonCode[]>;
  productDescriptionContainers: ProductDescriptionContainer[];
  properties: Property[];
  sessionDefinitions: SessionClass[];
  sessionTimeout: Date;
  teams: Team[];
  togglz: Map<string, TogglzFeature>;
}
