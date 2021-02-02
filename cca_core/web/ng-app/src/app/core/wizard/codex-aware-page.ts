import { CodexFieldName } from "./codex-field-name";
import { DomSanitizer } from "@angular/platform-browser";
import { PlaceholderDictionary } from "./placeholders/placeholder-dictionary";
import { CcaBaseComponent } from "../cca-base-component";

export abstract class CodexAwarePage extends CcaBaseComponent {

  abstract key: string;

  footer: string;
  mainAlert1: string;
  mainAlert2: string;
  mainBody1: string;
  mainBody2: string;
  mainHeader: string;
  navigationTitle: string;
  sidebarAlert1: string;
  sidebarAlert2: string;
  sidebarBody: string;
  sidebarHeader: string;
  title: string;

  codexResponse: any;

  applyCodexResponse ( codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer ): void {
    this.codexResponse   = codexResponse;
    this.footer          = this.applyCodexField ( codexResponse, CodexFieldName.FOOTER, placeholders, sanitizer );
    this.mainAlert1      = this.applyCodexField ( codexResponse, CodexFieldName.MAIN_ALERT_1, placeholders, sanitizer );
    this.mainAlert2      = this.applyCodexField ( codexResponse, CodexFieldName.MAIN_ALERT_2, placeholders, sanitizer );
    this.mainBody1       = this.applyCodexField ( codexResponse, CodexFieldName.MAIN_BODY_1, placeholders, sanitizer );
    this.mainBody2       = this.applyCodexField ( codexResponse, CodexFieldName.MAIN_BODY_2, placeholders, sanitizer );
    this.mainHeader      = this.applyCodexField ( codexResponse, CodexFieldName.MAIN_HEADER, placeholders );
    this.navigationTitle = this.applyCodexField ( codexResponse, CodexFieldName.NAVIGATION_TITLE, placeholders );
    this.sidebarAlert1   = this.applyCodexField ( codexResponse, CodexFieldName.SIDEBAR_ALERT_1, placeholders, sanitizer );
    this.sidebarAlert2   = this.applyCodexField ( codexResponse, CodexFieldName.SIDEBAR_ALERT_2, placeholders, sanitizer );
    this.sidebarBody     = this.applyCodexField ( codexResponse, CodexFieldName.SIDEBAR_BODY, placeholders, sanitizer );
    this.sidebarHeader   = this.applyCodexField ( codexResponse, CodexFieldName.SIDEBAR_HEADER, placeholders );
    this.title           = this.applyCodexField ( codexResponse, CodexFieldName.TITLE, placeholders );
  }

  /**
   * At least one of these fields must be present in order to display the sidebar.
   */
  isSidebarPopulated (): boolean {
    return !!this.sidebarAlert1
      || !!this.sidebarAlert2
      || !!this.sidebarBody;
  }

  private applyCodexField ( codexResponse: any, fieldName: string, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer = null ): string {
    let value;

    if ( codexResponse && fieldName ) {
      let codexKey = this.buildCodexKey ( fieldName );
      value        = codexResponse[ codexKey ];

      if ( value ) {
        value = placeholders ? placeholders.applyPlaceholders ( value ) : value;
        if ( value ) {
          value = !!sanitizer ? sanitizer.bypassSecurityTrustHtml ( value ) : value;
        }
      }
    }

    return value;
  }

  private buildCodexKey ( fieldName: string ): string {
    return `${this.key}-${fieldName}`;
  }
}
