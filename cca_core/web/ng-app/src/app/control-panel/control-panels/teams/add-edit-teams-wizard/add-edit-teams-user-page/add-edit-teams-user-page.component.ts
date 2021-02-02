import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {SessionQueue} from '../../../../../core/session/model/session-queue';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {AddEditTeamsWizard} from '../add-edit-teams-wizard';
import {User} from '../../../../../core/user/user';
import {Team} from '../../../../../core/auth/team';
import {TeamService} from '../../../../../core/team/team.service';
import {UserService} from '../../../../../core/user/user.service';

@Component({
  selector: 'cca-add-edit-teams-user-page',
  templateUrl: './add-edit-teams-user-page.component.html'
})
export class AddEditTeamsUserPageComponent extends WizardPage<AddEditTeamsWizard> implements OnInit {

  key: string             = 'user-page';
  wizardForm: FormGroup   = new FormGroup({
    userSearch: new FormControl('')
  });
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isActionable: boolean   = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  userList: User[] = [];

  constructor(private teamService: TeamService,
              private userService: UserService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title            = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Team';
    this.navigationTitle  = 'Users';
    this.actionButtonText = 'Save';

    this.wizardForm.get('userSearch').valueChanges.subscribe((userSearch: string) => {
      this.onUserSearch(userSearch);
    });
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Search for users and sort by last name.
   */
  onUserSearch(userSearch: string): void {
    if (userSearch && userSearch.length >= 3) {
      this.userService.search(userSearch).subscribe((users: User[]) => {
        this.userList = users.sort((a: User, b: User) => {
          if (a.lastName && b.lastName) {
            return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
          } else if (a.lastName) {
            return -1;
          } else if (b.lastName) {
            return 1;
          }
        });
      });
    }
  }

  /**
   * Update the model from the form and call the update.
   */
  onAction(): Observable<any> {
    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((team: Team) => {
          if (team === null) {
            this.toast.error(`Team failed to ${mode}.`);
          } else {
            this.toast.success(`Team successfully ${mode}d.`);
            this.wizard.model.team = team;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on the wizard mode.
   */
  private createOrUpdate(): Observable<SessionQueue> {
    // Remove the last login because the cscore date doesn't deserialize.  It doesn't persist, so no worry.
    for (let user of this.wizard.model.team.members) {
      user.lastLoginDate = null;
    }

    if (this.wizard.model.editMode) {
      return this.teamService.updateOne(this.wizard.model.team);
    } else {
      return this.teamService.create(this.wizard.model.team);
    }
  }

  /**
   * Return a list of users which don't already exist in the team.  Use the full list and filter it out.
   */
  public getUserList(): User[] {
    return this.userList
      .filter((user: User) => {
        return !this.wizard.model.team.members.find(u => u.id === user.id);
      });
  }

  /**
   * Push the passed in user to the array.
   *
   * @param user
   */
  public addUser(user: User): void {
    this.wizardForm.get('userSearch').setValue('');
    this.wizard.model.team.members.push(user);
  }

  /**
   * Delete the passed in user from the array.
   *
   * @param user
   */
  public deleteUser(user: User): void {
    this.wizard.model.team.members = this.wizard.model.team.members.filter((u: User) => {
      return u.id !== user.id;
    });
  }

  /**
   * For the user, show the username and display name if available.
   *
   * @param user
   */
  public getMenuName(user: User): string {
    if (user.username && user.displayName) {
      return user.username + ', ' + user.displayName;
    } else if (user.username) {
      return user.username;
    } else if (user.displayName) {
      return user.displayName;
    } else {
      return user.id.toString();
    }
  }
}
