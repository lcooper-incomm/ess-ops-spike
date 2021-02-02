import {Component, Input, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../cca-base-component";

@Component({
  selector: 'cca-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends CcaBaseComponent implements OnInit {
  @Input()
  color: string = 'primary';

  @Input()
  isDisabled: boolean = false;

  @Input()
  icon: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }


}
