import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CsCoreTableColumn} from '@cscore/components';
import {finalize} from 'rxjs/operators';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {PermissionCategoryService} from './permission-category.service';
import {PermissionCategory} from '../../../core/auth/permission-category';
import {AddEditPermissionCategoryWizard} from './add-edit-permission-category-wizard/add-edit-permission-category-wizard';

@Component({
  selector: 'cca-permission-categories',
  templateUrl: './permission-categories.component.html',
  providers: [
    PermissionCategoryService
  ]
})
export class PermissionCategoriesComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<PermissionCategory> = new MatTableDataSource<PermissionCategory>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<PermissionCategory>[] = [
    {
      key: 'systemName',
      label: 'System Name',
      getValue: (permissionCategory: PermissionCategory) => permissionCategory.systemName
    },
    {
      key: 'displayName',
      label: 'Display Name',
      getValue: (permissionCategory: PermissionCategory) => permissionCategory.displayName
    },
    {
      key: 'description',
      label: 'Description',
      getValue: (permissionCategory: PermissionCategory) => permissionCategory.description
    },
    {
      key: 'locked',
      label: 'Is Locked',
      getValue: (permissionCategory: PermissionCategory) => permissionCategory.locked ? 'Yes' : 'No'
    }
  ];

  constructor(private permissionCategoryService: PermissionCategoryService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.permissionCategoryService.findAll()
      .pipe(
        finalize(() => {
          this.loadingSpinner.stop();
        })
      )
      .subscribe((codes: PermissionCategory[]) => {
        this.dataSource.data = codes;
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddCategory() {
    let wizard                      = new AddEditPermissionCategoryWizard();
    wizard.model.permissionCategory = new PermissionCategory({});
    wizard.model.editMode           = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditPermissionCategoryWizard) => {
        this.findAll();
      });
  }

  public openEditCategory(permissionCategory: PermissionCategory) {
    let wizard                      = new AddEditPermissionCategoryWizard();
    wizard.model.permissionCategory = permissionCategory;
    wizard.model.editMode           = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditPermissionCategoryWizard) => {
        this.findAll();
      });
  }
}
