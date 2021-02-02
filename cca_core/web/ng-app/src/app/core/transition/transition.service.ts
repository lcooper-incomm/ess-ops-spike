import { Injectable } from '@angular/core';

@Injectable ( {
  providedIn: 'root'
} )
export class TransitionService {

  stateClass: string = 'off';
  ignoreOff: boolean = false;

  constructor () {
  }

  on (): void {
    this.stateClass = 'on';
  }

  off (): void {
    if (!this.ignoreOff) {
      this.stateClass = 'off';
    }
  }

  setIgnoreOff(ignoreOff: boolean): void {
    this.ignoreOff = ignoreOff;
  }
}
