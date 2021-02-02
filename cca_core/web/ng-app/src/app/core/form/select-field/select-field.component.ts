import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {AbstractControl, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {GenericOption} from '../../model/generic-option';
import {CcaBaseComponent} from '../../cca-base-component';
import {DictionaryService} from '../../dictionary/dictionary.service';
import {Dictionary} from '../../dictionary/dictionary';

/**
 * A wrapper for a mat-select.  If typeAhead is true, there will be a search input at the top of the list.
 * Right now option grouping is available, but only for dictionaries.
 */
@Component({
  selector: 'cca-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent<T> extends CcaBaseComponent implements OnChanges, OnInit {
  @Input()
  controlName: string;
  @Input()
  form: FormGroup;
  @Input()
  options: GenericOption<any>[] = [];
  @Input()
  placeholder: string           = null;
  @Input()
  panelClass: string            = null;
  @Input()
  required: boolean             = false;
  @Input()
  dictionary: string;
  @Input()
  dictionaryType: string;
  @Input()
  dictionaryOptions: Dictionary[];
  @Input()
  typeAhead: boolean            = false;

  search: string                        = '';
  displayValue: string;
  groups: any;
  filteredOptions: GenericOption<any>[] = [];
  filteredGroups: any;

  @ViewChild(MatSelect) select: MatSelect;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private dictionaryService: DictionaryService) {
    super();
  }

  ngOnInit(): void {
    this.select.openedChange.subscribe(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    });
    this.formControl.valueChanges.subscribe(() => {
      this.updateDisplay();
    });
  }

  /**
   * If the dictionary class changes, re-fetch the list of dictionaries.
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dictionary']) {
      this.dictionaryService.findAll(changes['dictionary'].currentValue).subscribe((dictionaries: Dictionary[]) => {
        if (this.dictionaryType) {
          this.buildOptions(dictionaries.filter((dictionary: Dictionary) => dictionary.type === this.dictionaryType));
        } else {
          this.buildOptions(dictionaries);
        }
      });
    }
    if (changes['dictionaryOptions']) {
      this.buildOptions(this.dictionaryOptions);
    }
    if (changes['options']) {
      this.filteredOptions = this.sortedOptions;
    }

    this.updateDisplay();
  }

  stop(event: KeyboardEvent): void {
    event.stopPropagation();
  }

  /**
   * When the search field updates, clear out the current filtered results and re-filter.
   *
   * @param event
   */
  updateSearch(event: KeyboardEvent): void {
    event.stopPropagation();
    let search = (<HTMLInputElement>event.target).value;

    // Clear out the filtered options
    this.filteredOptions = [];
    if (this.groups) {
      for (let group of this.groupKeys) {
        this.filteredGroups[group] = [];
      }
    }

    // If there is no search, the filtered options clones the options.
    if (search.length === 0) {
      this.filteredOptions = _.cloneDeep(this.options);
      this.filteredGroups  = _.cloneDeep(this.groups);
    }
    if (this.search !== search) {
      for (let option of this.options) {
        if (option.displayValue.toLowerCase().indexOf(search) !== -1) {
          this.filteredOptions.push(option);
          if (option.group) {
            this.filteredGroups[option.group].push(option);
          }
        }
      }
    }
    this.search = search;
  }

  get groupKeys(): string[] {
    return Object.keys(this.groups);
  }

  /**
   * Build options based on the dictionary list.
   *
   * @param dictionaries
   */
  private buildOptions(dictionaries: Dictionary[]): void {
    if (!dictionaries) {
      return;
    }
    this.options.splice(0, this.options.length);
    this.groups = undefined;

    // Push the options
    for (let dictionary of dictionaries) {
      this.options.push({
        value: dictionary.value,
        displayValue: dictionary.displayValue,
        group: dictionary.group
      });
    }

    // If the options have groups, push the groups after sorting the options.
    for (let option of this.sortedOptions) {
      if (option.group) {
        if (!this.groups) {
          this.groups = {};
        }

        if (!this.groups[option.group]) {
          this.groups[option.group] = [];
        }

        this.groups[option.group].push({
          value: option.value,
          displayValue: option.displayValue
        });
      }
    }

    this.search          = '';
    this.filteredOptions = _.cloneDeep(this.options);
    this.filteredGroups  = _.cloneDeep(this.groups);

    this.updateDisplay();
  }

  get formControl(): AbstractControl {
    return this.form.get(this.controlName);
  }

  get sortedOptions(): GenericOption<any>[] {
    return _.orderBy(this.options, ['sortOrder', 'group', 'displayValue', 'description']);
  }

  updateDisplay(): void {
    const value  = this.formControl.value;
    const option = value && this.getOption(value);
    if (!option) {
      this.displayValue = null;
    } else {
      this.displayValue = option.group ? option.group + ' - ' + option.displayValue : option.displayValue;
    }
  }

  private getOption(value: any): GenericOption<any> {
    return this.options.find(option => option.value === value);
  }
}
