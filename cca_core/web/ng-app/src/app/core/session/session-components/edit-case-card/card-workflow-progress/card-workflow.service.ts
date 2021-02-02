import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CardsComponentCardType } from '../../../model/cards-component-card-type.enum';
import { CardsComponentCard } from '../../../model/cards-component-card';

/**
 * A case card workflow can be represented by a graph, with each step being a node.
 * This service finds the best path in the graph given the current state of the card workflow progress.
 */

/**
 * Represents a node in the graph -- a specific step in the workflow
 */
export interface WorkflowStep {
  readonly displayValue: string;
  readonly value: StepField;
}

/**
 * Represents edges in the graph -- which steps can follow other steps
 */
export interface FlowOption {
  readonly currentState: StepField;
  readonly nextOptions: StepField[];
}

/**
 * Represents a subgraph -- a specific path through the graph, along with the current state and next options
 */
export interface CardWorkflow {
  readonly fields: StepField[];
  nextOptions?: WorkflowStep[];
  percentComplete?: number;
  currentState?: WorkflowStep;
}

enum StepField {
  DEACTIVATED            = 'isDeactivated',
  FUNDS_REMOVED          = 'isFundsRemoved',
  LOADED                 = 'isLoaded',
  SEEKING_APPROVAL       = 'isSeekingApproval',
  DENIED                 = 'isDenied',
  APPROVED               = 'isApproved',
  ACTIVATED              = 'isActivated',
  NEEDING_REPLACEMENT    = 'isNeedingReplacement',
  REPLACED               = 'isReplaced',
  NEEDING_CHECK_ISSUED   = 'isNeedingCheckIssued',
  CHECK_ISSUED           = 'isCheckIssued',
  AWAITING_IT_ACTIVATION = 'isAwaitingItActivation',
  IT_ACTIVATED           = 'isItActivated',
  SHIPPED                = 'isShipped',
  START                  = 'start',
  COMPLETE               = 'complete',
}

@Injectable ( {
  providedIn: 'root'
} )
export class CardWorkflowService {
  private readonly steps: Map<string, WorkflowStep>                       = new Map ();
  private readonly flowOptions: Map<CardsComponentCardType, FlowOption[]> = new Map ();

  constructor () {
    this.initSteps ();
    this.initFlowOptions ();
  }

  findCompletedWorkflowStepsForCard ( workflow: CardWorkflow, card: CardsComponentCard ): WorkflowStep[] {
    return workflow.fields
      .filter ( fieldName => !!card[ fieldName ] )
      .map ( fieldName => this.steps.get ( fieldName ) )
  }

  /**
   * This should be called every time a card is updated, as it will pick the longest-but-most-complete possible
   * workflow for the given card, populated with the next options to be taken. Once an option is completed, the
   * next workflow should be chosen, so the workflow progress stays as accurate as possible.
   */
  findWorkflowForCard ( card: CardsComponentCard ): CardWorkflow {
    const workflow = this.findBestWorkflowMatch ( card );

    if ( workflow.percentComplete < 100 ) {
      workflow.nextOptions = this.findNextOptionsInWorkflowForCard ( workflow, card );
    }

    return workflow;
  }

  private findBestWorkflowMatch ( card: CardsComponentCard ): CardWorkflow {
    // Find all workflows matching on type
    const filteredWorkflows: CardWorkflow[] = CardWorkflowService.findWorkflowsByCardType ( card.cardType );

    // Set next options and percent complete on each workflow
    filteredWorkflows.forEach ( workflow => {
      workflow.nextOptions      = [];
      const completedFieldCount = this.findCompletedWorkflowStepsForCard ( workflow, card ).length;
      workflow.percentComplete  = Math.round ( completedFieldCount / workflow.fields.length * 100 );
    } );

    // Find the longest-but-most-complete workflow (sort by percentComplete THEN length)
    const sortedWorkflows: CardWorkflow[] = _.orderBy ( filteredWorkflows, [ 'percentComplete', ( workflow: CardWorkflow ) => workflow.fields.length ], [ 'desc', 'desc' ] );
    const selectedWorkflow                = sortedWorkflows[ 0 ];

    // Set current state to complete if applicable
    if ( selectedWorkflow.percentComplete === 100 ) {
      selectedWorkflow.currentState = this.steps.get ( StepField.COMPLETE );
    }

    return selectedWorkflow;
  }

  /**
   * Iterate through the selected workflow's fields until we find a step that isn't yet complete
   */
  private static findCurrentStateInWorkflowForCard ( workflow: CardWorkflow, card: CardsComponentCard ): string {
    for ( let i = 0; i < workflow.fields.length; i++ ) {
      const fieldName = workflow.fields[ i ];
      if ( !card[ fieldName ] ) {
        /*
        If we haven't even completed the first step of the workflow, just return null so we can later find
        the Start step
          */
        if ( i === 0 ) {
          return StepField.START;
        }
        return workflow.fields[ i - 1 ];
      }
    }
  }

  private findFlowOption ( cardType: CardsComponentCardType, currentState: string ): FlowOption {
    return this.flowOptions.get ( cardType ).find ( option => option.currentState === currentState );
  }

  private findNextOptionsInWorkflowForCard ( workflow: CardWorkflow, card: CardsComponentCard ): WorkflowStep[] {
    const currentState    = CardWorkflowService.findCurrentStateInWorkflowForCard ( workflow, card );
    // Populate displayable object for current state
    workflow.currentState = this.steps.get ( currentState );

    // If workflow is complete, return empty array
    if ( currentState === StepField.COMPLETE ) {
      return [];
    } else {
      // Find flow option for next state
      const currentFlowOption = this.findFlowOption ( card.cardType, currentState );

      // Populate options with full displayable objects before returning
      const nextOptions = currentFlowOption.nextOptions.map ( fieldName => this.steps.get ( fieldName ) );

      return _.orderBy ( nextOptions, [ 'displayValue' ], [ 'asc' ] );
    }
  }

  private static findWorkflowsByCardType ( cardType: CardsComponentCardType ): CardWorkflow[] {
    switch ( cardType ) {
      case CardsComponentCardType.ACTIVE:
        return [
          {
            fields: [
              StepField.DEACTIVATED,
              StepField.FUNDS_REMOVED,
            ]
          },
        ];
      case CardsComponentCardType.INACTIVE:
        return [
          {
            fields: [
              StepField.SEEKING_APPROVAL,
              StepField.DENIED,
            ]
          },
          {
            fields: [
              StepField.SEEKING_APPROVAL,
              StepField.APPROVED,
              StepField.ACTIVATED
            ]
          },
          {
            fields: [
              StepField.SEEKING_APPROVAL,
              StepField.APPROVED,
              StepField.NEEDING_REPLACEMENT,
              StepField.REPLACED,
            ]
          },
          {
            fields: [
              StepField.SEEKING_APPROVAL,
              StepField.APPROVED,
              StepField.NEEDING_CHECK_ISSUED,
              StepField.CHECK_ISSUED,
            ]
          },
          {
            fields: [
              StepField.AWAITING_IT_ACTIVATION,
              StepField.IT_ACTIVATED,
            ]
          },
        ];
      case CardsComponentCardType.REPLACEMENT:
        return [
          {
            fields: [
              StepField.LOADED,
              StepField.SHIPPED,
            ]
          },
        ];
    }
  }

  private initSteps (): void {
    const steps: WorkflowStep[] = [
      {
        displayValue: 'Deactivated',
        value: StepField.DEACTIVATED,
      },
      {
        displayValue: 'Funds Removed',
        value: StepField.FUNDS_REMOVED,
      },
      {
        displayValue: 'Loaded',
        value: StepField.LOADED,
      },
      {
        displayValue: 'Seeking Approval',
        value: StepField.SEEKING_APPROVAL,
      },
      {
        displayValue: 'Denied',
        value: StepField.DENIED,
      },
      {
        displayValue: 'Approved',
        value: StepField.APPROVED,
      },
      {
        displayValue: 'Activated',
        value: StepField.ACTIVATED,
      },
      {
        displayValue: 'Needs Replacement',
        value: StepField.NEEDING_REPLACEMENT,
      },
      {
        displayValue: 'Replaced',
        value: StepField.REPLACED,
      },
      {
        displayValue: 'Needs Check Issued',
        value: StepField.NEEDING_CHECK_ISSUED,
      },
      {
        displayValue: 'Check Issued',
        value: StepField.CHECK_ISSUED,
      },
      {
        displayValue: 'Awaiting IT Activation',
        value: StepField.AWAITING_IT_ACTIVATION,
      },
      {
        displayValue: 'IT Activated',
        value: StepField.IT_ACTIVATED,
      },
      {
        displayValue: 'Shipped',
        value: StepField.SHIPPED,
      },
      {
        displayValue: 'Start',
        value: StepField.START,
      },
      {
        displayValue: 'Complete',
        value: StepField.COMPLETE,
      },
    ];

    steps.forEach ( step => this.steps.set ( step.value, step ) );
  }

  private initFlowOptions (): void {
    const activeFlowOptions: FlowOption[] = [
      {
        currentState: StepField.START,
        nextOptions: [
          StepField.DEACTIVATED,
        ],
      },
      {
        currentState: StepField.DEACTIVATED,
        nextOptions: [
          StepField.FUNDS_REMOVED,
        ],
      },
    ];

    const inactiveFlowOptions: FlowOption[] = [
      {
        currentState: StepField.START,
        nextOptions: [
          StepField.SEEKING_APPROVAL,
          StepField.AWAITING_IT_ACTIVATION,
        ],
      },
      {
        currentState: StepField.SEEKING_APPROVAL,
        nextOptions: [
          StepField.APPROVED,
          StepField.DENIED,
        ],
      },
      {
        currentState: StepField.APPROVED,
        nextOptions: [
          StepField.ACTIVATED,
          StepField.NEEDING_REPLACEMENT,
          StepField.NEEDING_CHECK_ISSUED,
        ],
      },
      {
        currentState: StepField.NEEDING_REPLACEMENT,
        nextOptions: [
          StepField.REPLACED,
        ],
      },
      {
        currentState: StepField.NEEDING_CHECK_ISSUED,
        nextOptions: [
          StepField.CHECK_ISSUED,
        ],
      },
      {
        currentState: StepField.AWAITING_IT_ACTIVATION,
        nextOptions: [
          StepField.IT_ACTIVATED,
        ],
      },
    ];

    const replacementFlowOptions: FlowOption[] = [
      {
        currentState: StepField.START,
        nextOptions: [
          StepField.LOADED,
        ],
      },
      {
        currentState: StepField.LOADED,
        nextOptions: [
          StepField.SHIPPED,
        ],
      }
    ];

    this.flowOptions.set ( CardsComponentCardType.ACTIVE, activeFlowOptions );
    this.flowOptions.set ( CardsComponentCardType.INACTIVE, inactiveFlowOptions );
    this.flowOptions.set ( CardsComponentCardType.REPLACEMENT, replacementFlowOptions );
  }
}
