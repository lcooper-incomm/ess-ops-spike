import { MaplesPlatform } from "@cscore/maples-client-model";

export enum PlatformType {
  ALDER     = 'ALDER',
  APS       = 'APS',
  BIF       = 'BIF',
  BOL       = 'BOL',
  BOOST     = 'BOOST',
  CASHTIE   = 'CASHTIE',
  CCA       = 'CCA',
  CCL       = 'CCL',
  DDP       = 'DDP',
  DSTA      = 'DSTA',
  DSTB      = 'DSTB',
  ECOMM     = 'ECOMM',
  ENCOR     = 'ENCOR',
  EPS       = 'EPS',
  GOOGLE    = 'GOOGLE',
  GREENCARD = 'GREENCARD',
  INCOMM    = 'INCOMM',
  JIRA      = 'JIRA',
  LOTTERY   = 'LOTTERY',
  MDM       = 'MDM',
  MICROSOFT = 'MICROSOFT',
  NET10     = 'NET10',
  PRE       = 'PRE',
  SEJ       = 'SEJ',
  SERVE     = 'SERVE',
  SRL       = 'SRL',
  TRACFONE  = 'TRACFONE',
  VIRGIN    = 'VIRGIN',
  VMS       = 'VMS'
}

export function getPlatformTypeDisplayValue ( type: PlatformType ): string {
  let displayValue: string;

  switch ( type ) {
    case PlatformType.ALDER:
      displayValue = 'Alder';
      break;
    case PlatformType.BOOST:
      displayValue = 'Boost';
      break;
    case PlatformType.CASHTIE:
      displayValue = 'Vanilla Direct';
      break;
    case PlatformType.ECOMM:
      displayValue = 'E-Comm';
      break;
    case PlatformType.GREENCARD:
      displayValue = 'GreenCard';
      break;
    case PlatformType.INCOMM:
    case PlatformType.SEJ:
    case PlatformType.MDM:
      displayValue = 'InComm';
      break;
    case PlatformType.MICROSOFT:
      displayValue = 'Microsoft';
      break;
    case PlatformType.NET10:
      displayValue = 'Net10';
      break;
    case PlatformType.SERVE:
      displayValue = 'Serve';
      break;
    case PlatformType.TRACFONE:
      displayValue = 'TracFone';
      break;
    case PlatformType.VIRGIN:
      displayValue = 'Virgin';
      break;
    case PlatformType.GOOGLE:
      displayValue = 'Google';
      break;
    default:
      displayValue = type.toString ();
      break;
  }

  return displayValue;
}

export function isFsapiPlatform ( platform: PlatformType ): boolean {
  return [
    PlatformType.VMS,
    PlatformType.CCL,
  ].includes ( platform );
}

export function getFromMaplesPlatform(maplesPlatform: MaplesPlatform): PlatformType {
  switch (maplesPlatform) {
    case MaplesPlatform.ALDER:
      return PlatformType.ALDER;
    case MaplesPlatform.BIF:
      return PlatformType.BIF;
    case MaplesPlatform.BOL:
      return PlatformType.BOL;
    case MaplesPlatform.ECOMM:
      return PlatformType.ECOMM;
    case MaplesPlatform.ENCOR:
      return PlatformType.ENCOR;
    case MaplesPlatform.MDM:
      return PlatformType.MDM;
    case MaplesPlatform.SERVE:
      return PlatformType.SERVE;
  }
}
