import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {CsCoreTableColumn} from '@cscore/components';
import {GenericOption} from '../../../core/model/generic-option';
import {getSessionTypeOptions} from '../../../core/session/session-type-type.enum';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {AddEditQueueWizard} from './add-edit-queue-wizard/add-edit-queue-wizard';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SessionQueue} from '../../../core/session/model/session-queue';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {QueueService} from '../../../core/queue/queue.service';

@Component({
  selector: 'cca-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.scss']
})
export class QueuesComponent extends CcaBaseComponent implements OnInit {

  form: FormGroup                              = new FormGroup({
    sessionType: new FormControl(null)
  });
  sessionTypes: GenericOption<any>[]           = getSessionTypeOptions(true);
  dataSource: MatTableDataSource<SessionQueue> = new MatTableDataSource<SessionQueue>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<SessionQueue>[] = [
    {
      key: 'systemName',
      label: 'System Name',
      getValue: (category: SessionQueue) => category.systemName,
    },
    {
      key: 'displayName',
      label: 'Display Name',
      getValue: (category: SessionQueue) => category.displayName,
    },
    {
      key: 'locale',
      label: 'Locale',
      getValue: (category: SessionQueue) => category.locale,
    },
    {
      key: 'isActive',
      label: 'Is Active',
      getValue: (category: SessionQueue) => category.isActive ? 'Active' : 'Inactive',
    },
    {
      key: 'autoWrapTime',
      label: 'Auto Wrap Time',
      getValue: (category: SessionQueue) => category.autoWrapTime,
    },
    {
      key: 'roboHelpId',
      label: 'roboHelpId',
      getValue: (category: SessionQueue) => category.roboHelpId,
    },
    {
      key: 'defaultNote',
      label: 'Default Note',
      getValue: (category: SessionQueue) => category.defaultNote,
    }
  ];

  constructor(private queueService: QueueService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAllQueues();

    this.form.get('sessionType').valueChanges.subscribe(() => {
      this.findAllQueues();
    });
  }

  private findAllQueues() {
    this.loadingSpinner.start();
    this.queueService.findAllBySessionType(this.form.get('sessionType').value)
      .subscribe((queues: SessionQueue[]) => {
        this.dataSource.data = queues;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddQueue() {
    let wizard            = new AddEditQueueWizard();
    wizard.model.queue    = new SessionQueue({
      permission: {}
    });
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditQueueWizard) => {
        this.findAllQueues();
      });
  }

  public openEditQueue(queue: SessionQueue) {
    let wizard            = new AddEditQueueWizard();
    wizard.model.queue    = queue;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditQueueWizard) => {
        this.findAllQueues();
      });
  }
}
