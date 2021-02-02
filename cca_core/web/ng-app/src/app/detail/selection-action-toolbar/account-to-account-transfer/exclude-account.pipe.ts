import {Pipe, PipeTransform} from '@angular/core';
import {MaplesSimpleAccountInfo} from '../../../core/session/model/maples-simple-account-info';

@Pipe({
  name: 'excludeAccount',
  pure: true
})
export class ExcludeAccountPipe implements PipeTransform {

  transform(accounts: MaplesSimpleAccountInfo[], fromAccount: MaplesSimpleAccountInfo): any {
    return accounts.filter(account => !fromAccount || account.id !== fromAccount.id);
  }
}
