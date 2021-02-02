import { IdentificationTypeType } from "./identification-type-type.enum";

export class IdentificationTypeUtil {

  static getDisplayValue ( type: IdentificationTypeType ): string {
    switch ( type ) {
      case IdentificationTypeType.DRIVERS_LICENSE:
        return 'Driver\'s License';
      case IdentificationTypeType.PASSPORT:
        return 'Passport';
      case IdentificationTypeType.SOCIAL_INSURANCE_NUMBER:
        return 'SIN';
      case IdentificationTypeType.SOCIAL_SECURITY_NUMBER:
        return 'SSN';
      default:
        return type;
    }
  }
}
