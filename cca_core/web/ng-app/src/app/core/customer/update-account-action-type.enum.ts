export enum UpdateAccountActionType {
  RESET_PASSWORD                                      = 'RESET_PASSWORD',
  UNLOCK_ACCOUNT                                      = 'UNLOCK_ACCOUNT',
  UNLOCK_ACCOUNT_FOR_TOKEN_PROVISIONING               = 'UNLOCK_ACCOUNT_FOR_TOKEN_PROVISIONING',
  UNLOCK_ACCOUNT_WITH_OVERRIDE_FOR_TOKEN_PROVISIONING = 'UNLOCK_ACCOUNT_WITH_OVERRIDE_FOR_TOKEN_PROVISIONING',
  UPDATE_ADDRESS                                      = 'UPDATE_ADDRESS',
  UPDATE_ADDRESS_OVERRIDE_AVS                         = 'UPDATE_ADDRESS_OVERRIDE_AVS',
  UPDATE_EMAIL                                        = 'UPDATE_EMAIL',
  UPDATE_FEE_PLAN                                     = 'UPDATE_FEE_PLAN',
  UPDATE_IDENTIFICATION                               = 'UPDATE_IDENTIFICATION',
  UPDATE_NAME                                         = 'UPDATE_NAME',
  UPDATE_OCCUPATION                                   = 'UPDATE_OCCUPATION',
  UPDATE_PHONE                                        = 'UPDATE_PHONE',
  UPDATE_TAX_INFO                                     = 'UPDATE_TAX_INFO',
  UPDATE_THIRD_PARTY_INFO                             = 'UPDATE_THIRD_PARTY_INFO',
  UPGRADE_ACCOUNT                                     = 'UPGRADE_ACCOUNT'
}
