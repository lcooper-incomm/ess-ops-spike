import { PlaceholderDictionary } from "./placeholders/placeholder-dictionary";
import { ComponentRef, Type } from "@angular/core";
import { WizardPage } from "./wizard-page";
import { User } from "../user/user";
import { Selection } from "../session/model/selection";
import { Observable, of } from "rxjs";

export abstract class AbstractWizard<T> {

  abstract key: string;
  abstract displayStepper: boolean;
  abstract startingPageKey: string;

  /**
   * Pull data from the model and/or supporting data, or anywhere else for that matter, that you need to send for the
   * Codex rules check. This might be selection data such as statuses, balances, etc, or user data such as permissions,
   * anything that rules will be (or may be) keying off of.
   */
  abstract buildCodexRequest ( formValue: any ): any;

  /**
   * Map all possible page component types to their respective keys. This is called before init().
   */
  abstract initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void;

  currentPageKey: string;
  doRefresh: boolean                                = false;
  isInitialized: boolean                            = false;
  model: T;
  navigationHistory: Map<string, string>            = new Map<string, string> ();
  pageMappings: Map<string, Type<WizardPage<any>>>  = new Map<string, Type<WizardPage<any>>> ();
  pages: Map<string, ComponentRef<WizardPage<any>>> = new Map<string, ComponentRef<WizardPage<any>>> ();
  placeholderDictionary                             = new PlaceholderDictionary ();
  supportingData: any                               = null;

  /**
   * If you need to hide pages conditionally or do any other global wizard configuration after the pages are built, but
   * before the first page displays, override this to do it. Most of the time, you can likely ignore this.
   */
  preProcess (): Observable<any> {
    return of ( null );
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    this.placeholderDictionary.addPlaceholdersForUser ( user );
    this.placeholderDictionary.addPlaceholdersForSelection ( selection );
  }

  getPreviousPageKey (pageKey?: string): string {
    pageKey = pageKey || this.currentPageKey;
    let previousPageKey: string = null;

    this.navigationHistory.forEach ( ( to: string, from: string ) => {
      if ( to === pageKey ) {
        previousPageKey = from;
      }
    } );

    return previousPageKey;
  }

  recordNavigation ( from: string, to: string ): void {
    if ( from !== to ) {
      this.navigationHistory.set ( from, to );
    }
  }

  removeFromNavigationHistory(pageKey: string) {
    const from = this.getPreviousPageKey(pageKey);
    const to = this.navigationHistory.get(pageKey);
    this.navigationHistory.set(from, to);
    this.navigationHistory.delete(pageKey);
  }
}
