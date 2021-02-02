import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from "../../cca-base-component";

@Component ( {
  selector: 'cca-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrls: [ './comment-field.component.scss' ]
} )
export class CommentFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  controlName: string;
  @Input ()
  form: FormGroup;
  @Input ()
  placeholder: string = null;
  @Input ()
  required: boolean   = false;
  @Input ()
  appearance: string;
  @Input()
  autoSize: boolean = false;
  @Input()
  minRows: number = 5;

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
