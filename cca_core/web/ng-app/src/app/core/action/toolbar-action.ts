export class ToolbarAction {

  disabledReason: string;
  label: string;
  type: string;

  onClick (): void {
    console.warn ( 'Override the ToolbarAction\'s onClick() to instantiate and run the Wizard' );
  }
}
