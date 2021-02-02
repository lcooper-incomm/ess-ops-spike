import {CsCorePhoneNumber, CsCoreTimestamp} from '@cscore/core-client-model';
import {MaplesPartner} from '@cscore/maples-client-model';
import {Partner} from '../session/selection/partner';
import {Group} from '../auth/group';
import {Permission} from '../auth/permission';
import {Role} from '../auth/role';
import {Team} from '../auth/team';
import {SessionTypeType} from '../session/session-type-type.enum';
import {SummaryModeType} from './summary-mode-type.enum';
import {PlatformType} from '../platform/platform-type.enum';

export class User {
  id: number;
  company: string;
  department: string;
  displayName: string;
  email: string;
  employeeId: string;
  firstName: string;
  isActive: boolean              = false;
  isSystemAdministrator: boolean = false;
  lastLoginDate: CsCoreTimestamp;
  lastName: string;
  mobile: CsCorePhoneNumber;
  phone: CsCorePhoneNumber;
  title: string;
  username: string;

  prefDefaultBolPartner: MaplesPartner;
  prefDefaultDataSource: PlatformType;
  prefDefaultPartner: Partner;
  prefDefaultCclPartner: Partner;
  prefDefaultLandingPage: string;
  prefDefaultSearchTypeId: number;
  prefDefaultSessionType: SessionTypeType;
  prefDefaultDockMode: string;
  prefDontShowWhatsNew: boolean = false;
  prefShowBillableOnly: boolean = false;
  prefSummaryMode: SummaryModeType;

  groups: Group[]           = [];
  permissions: Permission[] = [];
  roles: Role[]             = [];
  teams: Team[]             = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.groups      = [];
      this.permissions = [];
      this.roles       = [];
      this.teams       = [];

      if ( data.lastLoginDate ) {
        this.lastLoginDate = new CsCoreTimestamp ( data.lastLoginDate );
      }
      if ( data.mobile ) {
        this.mobile = new CsCorePhoneNumber ( data.mobile );
      }
      if ( data.phone ) {
        this.phone = new CsCorePhoneNumber ( data.phone );
      }
      if ( data.prefDefaultBolPartner ) {
        this.prefDefaultBolPartner = MaplesPartner[ <string>data.prefDefaultBolPartner ];
      }
      if ( data.prefDefaultDataSource ) {
        this.prefDefaultDataSource = PlatformType[ <string>data.prefDefaultDataSource ];
      }
      if ( data.prefDefaultPartner ) {
        this.prefDefaultPartner = new Partner ( data.prefDefaultPartner );
      }
      if ( data.prefDefaultCclPartner ) {
        this.prefDefaultCclPartner = new Partner ( data.prefDefaultCclPartner );
      }
      if ( data.prefDefaultSessionType ) {
        this.prefDefaultSessionType = SessionTypeType[ <string>data.prefDefaultSessionType ];
      }
      if ( data.prefSummaryMode ) {
        this.prefSummaryMode = SummaryModeType[ <string>data.prefSummaryMode ];
      }
      if ( data.groups && data.groups.length ) {
        data.groups.forEach ( group => this.groups.push ( new Group ( group ) ) );
      }
      if ( data.permissions && data.permissions.length ) {
        data.permissions.forEach ( permission => this.permissions.push ( new Permission ( permission ) ) );
      }
      if ( data.roles && data.roles.length ) {
        data.roles.forEach ( role => this.roles.push ( new Role ( role ) ) );
      }
      if ( data.teams && data.teams.length ) {
        data.teams.forEach ( team => this.teams.push ( new Team ( team ) ) );
      }
    }
  }
}
