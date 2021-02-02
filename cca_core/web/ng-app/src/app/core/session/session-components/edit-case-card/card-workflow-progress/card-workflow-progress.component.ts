import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CardWorkflowService, WorkflowStep, CardWorkflow } from './card-workflow.service';
import { CardsComponentCard } from '../../../model/cards-component-card';
import { MatCheckboxChange } from '@angular/material';

@Component ( {
  selector: 'cca-card-workflow-progress',
  templateUrl: './card-workflow-progress.component.html',
  styleUrls: [ './card-workflow-progress.component.scss' ]
} )
export class CardWorkflowProgressComponent implements OnInit {
  @Input () card: CardsComponentCard;
  @Output () expand = new EventEmitter<boolean> ();

  completedSteps: WorkflowStep[] = [];
  expanded: boolean              = false;
  workflow: CardWorkflow;

  constructor ( private cardWorkflowService: CardWorkflowService ) {
  }

  ngOnInit (): void {
    this.updateWorkflow ();
  }

  toggleExpand (): void {
    this.expanded = !this.expanded;
    this.expand.emit ( this.expanded );
  }

  get expandTooltip (): string {
    return this.expanded ? 'Hide completed workflow steps' : 'Show completed workflow steps';
  }

  stepChanged ( key: string, value: MatCheckboxChange ) {
    this.card[ key ] = value.checked;
    this.updateWorkflow ();
  }

  updateWorkflow (): void {
    this.workflow       = this.cardWorkflowService.findWorkflowForCard ( this.card );
    this.completedSteps = this.cardWorkflowService.findCompletedWorkflowStepsForCard ( this.workflow, this.card );
  }
}
