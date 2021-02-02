import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {CsCoreTableColumn} from '@cscore/components';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {TogglzFeature} from '../../../core/config/togglz-feature';
import {TogglzService} from '../../../core/config/togglz.service';
import {AppStateType} from '../../../app-state-type.enum';
import {SupportState} from '../../../core/support/support-state';
import {SupportService} from '../../../core/support/support.service';
import {AreYouSureWizard} from '../../../core/wizard-common/are-you-sure-wizard/are-you-sure-wizard';
import {MatButtonToggleChange} from '@angular/material/button-toggle';

@Component({
  selector: 'cca-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<TogglzFeature> = new MatTableDataSource<TogglzFeature>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<TogglzFeature>[] = [
    {
      key: 'name',
      label: 'Feature Name',
      getValue: (feature: TogglzFeature) => feature.name,
    },
    {
      key: 'isActive',
      label: 'Is Active',
      getValue: (feature: TogglzFeature) => undefined,
    },
    {
      key: 'groups',
      label: 'Groups',
      getValue: (feature: TogglzFeature) => {
        let groups: string;
        for (let group of feature.groups) {
          groups = (groups) ? groups + ', ' + group : group;
        }
        return groups;
      },
    }
  ];

  constructor(private togglzService: TogglzService,
              private supportService: SupportService,
              private wizardRunner: WizardRunner,
              private store: Store<SupportState>) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.addSubscription(
      this.store.select(AppStateType.SUPPORT_STATE)
        .subscribe((state: SupportState) => {
          let features: TogglzFeature[] = [];
          if (state) {
            Object.keys(state.togglz).forEach((key: string) => {
              features.push(state.togglz[key]);
            });
            this.dataSource.data = features;
          }
        })
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Update the feature to change its active status.  When the update finishes, prompt the
   * support service to re-fetch the togglz.
   *
   * @param name
   * @param isActive
   */
  public setState(oldState: MatButtonToggleChange, feature: TogglzFeature): void {
    let newState: boolean = oldState.source.checked;

    const wizard: AreYouSureWizard = new AreYouSureWizard();
    wizard.model.message           = 'Change ' + feature.name + ' status from ' + ((newState) ? 'Inactive to Active' : 'Active to Inactive') + '.';
    this.wizardRunner.run(wizard)
      .afterClosed().subscribe(() => {
        if (wizard.model.doAction) {
          this.loadingSpinner.start();
          this.togglzService.updateOne(feature.name, newState)
            .subscribe(() => {
              this.supportService.loadTogglz()
                .subscribe(() => {
                  this.loadingSpinner.stop();
                });
            });
        } else {
          feature.isActive = !newState;
          oldState.source.checked = !newState;
        }
      }
    );
  }
}
