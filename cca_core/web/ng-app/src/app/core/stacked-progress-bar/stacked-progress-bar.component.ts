import { Component, Input, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component ( {
  selector: 'cca-stacked-progress-bar',
  templateUrl: './stacked-progress-bar.component.html',
  styleUrls: [ './stacked-progress-bar.component.scss' ]
} )
export class StackedProgressBarComponent implements OnInit {
  @Input ()
  percentages: number[] = [];
  @Input ()
  colors: string[]      = [];
  @Input ()
  toolTips: string[]    = [];
  @Input ()
  counts: number[]      = [];

  isLast: number;
  isSingle: boolean = false;

  constructor () {
  }

  ngOnInit () {
    if ( ((_.without ( this.counts, 0 )).length) === 1 ) {
      this.isSingle = true;
    }

    let visibleBars = _.without ( this.counts, 0 ).length;
    this.isLast     = visibleBars - 1;
  }

}
