import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {CsCoreTableColumn} from '@cscore/components';
import {TeamService} from '../../../core/team/team.service';
import {Team} from '../../../core/auth/team';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {AddEditTeamsWizard} from './add-edit-teams-wizard/add-edit-teams-wizard';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';

@Component({
  selector: 'cca-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit {

  dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<Team>[] = [
    {
      key: 'id',
      label: 'ID',
      getValue: (team: Team) => team.id,
    },
    {
      key: 'systemName',
      label: 'System Name',
      getValue: (team: Team) => team.systemName,
    },
    {
      key: 'displayName',
      label: 'Display Name',
      getValue: (team: Team) => team.displayName,
    },
    {
      key: 'description',
      label: 'Description',
      getValue: (team: Team) => team.description,
    },
    {
      key: 'users',
      label: '# Users',
      getValue: (team: Team) => team.members.length,
    }
  ];

  constructor(private teamService: TeamService,
              private wizardRunner: WizardRunner) {
  }

  ngOnInit() {
    this.findTeams();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private findTeams() {
    this.teamService.findAll(true)
      .subscribe((teams: Team[]) => {
        this.dataSource.data = teams;
      });
  }

  public openAddTeam() {
    let wizard            = new AddEditTeamsWizard();
    wizard.model.team    = new Team({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditTeamsWizard) => {
        this.findTeams();
      });
  }

  public openEditTeam(team: Team) {
    let wizard            = new AddEditTeamsWizard();
    wizard.model.team    = team;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditTeamsWizard) => {
        this.findTeams();
      });
  }
}
