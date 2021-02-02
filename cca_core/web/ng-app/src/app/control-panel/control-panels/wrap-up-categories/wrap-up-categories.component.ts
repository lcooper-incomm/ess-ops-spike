import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {WrapUpCodeCategory} from '../../../core/session/model/wrap-up-code-category';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {WrapUpCodeCategoryService} from '../../../core/wrap-up-code-category/wrap-up-code-category.service';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {AddEditCategoryWizard} from './add-edit-category-wizard/add-edit-category-wizard';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {CsCoreTableColumn} from '@cscore/components';

@Component({
  selector: 'cca-wrap-up-categories',
  templateUrl: './wrap-up-categories.component.html',
  styleUrls: ['./wrap-up-categories.component.scss']
})
export class WrapUpCategoriesComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<WrapUpCodeCategory> = new MatTableDataSource<WrapUpCodeCategory>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;


  columns: CsCoreTableColumn<WrapUpCodeCategory>[] = [
    {
      key: 'i3Name',
      label: 'I3 Name',
      getValue: (category: WrapUpCodeCategory) => category.i3Name,
    },
    {
      key: 'displayName',
      label: 'Display Name',
      getValue: (category: WrapUpCodeCategory) => category.displayName,
    },
    {
      key: 'isActive',
      label: 'Is Active',
      getValue: (category: WrapUpCodeCategory) => category.isActive ? 'Active' : 'Inactive',
    }
  ];

  constructor(private categoryService: WrapUpCodeCategoryService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.categoryService.findAll()
      .subscribe((categories: WrapUpCodeCategory[]) => {
        this.dataSource.data = categories;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddCategory() {
    let wizard            = new AddEditCategoryWizard();
    wizard.model.category = new WrapUpCodeCategory({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditCategoryWizard) => {
        this.findAll();
      });
  }

  public openEditCategory(category: WrapUpCodeCategory) {
    let wizard            = new AddEditCategoryWizard();
    wizard.model.category = category;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditCategoryWizard) => {
        this.findAll();
      });
  }
}
