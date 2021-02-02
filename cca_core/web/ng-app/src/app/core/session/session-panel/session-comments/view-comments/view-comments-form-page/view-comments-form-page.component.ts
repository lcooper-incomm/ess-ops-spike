import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../../wizard/wizard-page";
import {ViewCommentsWizard} from "../view-comments-wizard";
import {FormGroup} from "@angular/forms";
import {WizardWidth} from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-view-comments-form-page',
  templateUrl: './view-comments-form-page.component.html',
  styleUrls: [ './view-comments-form-page.component.scss' ]
} )
export class ViewCommentsFormPageComponent extends WizardPage<ViewCommentsWizard> implements OnInit {

  isCloseable: boolean  = true;
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.width = WizardWidth.SMALL_MEDIUM;
  }

  ngOnInit () {

  }

}


