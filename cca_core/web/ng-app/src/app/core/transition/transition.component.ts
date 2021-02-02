import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as _ from "lodash";
import { TransitionService } from "./transition.service";

@Component ( {
  selector: 'cca-transition',
  templateUrl: './transition.component.html',
  styleUrls: [ './transition.component.scss' ]
} )
export class TransitionComponent extends CcaBaseComponent implements OnInit {

  loadingText: string;
  stateClass: string    = 'off';
  textOptions: string[] = [];

  constructor ( private store: Store<AppState>,
                public transitionService: TransitionService ) {
    super ();
  }

  ngOnInit () {
    this.populateTextOptions ();
    this.selectRandomLoadingText ();
  }

  populateTextOptions (): void {
    this.textOptions = [
      'Please wait while we prod the hamsters...',
      'Please wait. The bits are breeding...',
      'Pay no attention to the man behind the curtain...',
      'Please wait. Enjoy this beautiful elevator music.',
      'Please wait while we box up BB-8 and bid him farewell...',
      'Please wait. A few bits tried to escape, but we caught them.',
      'Please wait, and dream of faster computers. And Skittles.',
      'We\'re building all the things so you can do all the stuff.',
      'Please wait, this might take a moment... Or twenty...',
      'We recommend not holding your breath while you wait...',
      'At least you\'re not the one on hold. Oh, wait...',
      'Your neighbor is peeking around the wall...',
      'We find ourselves... Well... not in Kansas anymore...',
      'Please wait. The hamsters need a break...',
      'Please wait while we duct-tape some things back together...',
      'We\'re testing your patience... Results still pending...',
      'Please wait, and try not to think of purple hippos...',
      'The last time we tried this- well, ha, let\'s just hope it works better this time...',
      'We should have had a V8 this morning...',
      'Please wait, and- Oh, look! A bunny!',
      'Please wait. We\'re writing more funny loading messages...',
      'We\'re working on a faster loading screen, but it\'s not going well...',
      'Please wait. The reticulating splines are out of alignment...',
      'Please wait. We\'re warming up the Large Hadron Collider for you...',
      'Please wait. We\'re recruiting robot hamsters... Don\'t ask why. It\'s none of your business.',
      'Please wait. We\'re- No. No! NOOOOOOOOOOOOOO!!!',
      'Please wait while we recalibrate the recalibrators to commence recalibration...',
      'Oh, hello. How are you?',
      'Pick me! No, me! Right here!',
      'We\'re functioning normally. Sit tight.',
      'Please wait. Yep. Right here. With Schrodinger\'s Cat.',
      'Please wait while we load the jiggle mechanics.',
      'Knock, knock... Knock, knock! Hey! Are you listening? Knock, knock!',
      'Please wait, we need to take this call.',
      'Please wait while we activate the continuum time-space doohickey.',
      'Please wait. Skippy the Magnificent is on the case!',
      'Please refrain from singing obnoxiously. Your neighbors are working.',
      'Please wait. We\'re warming up all the tiny violins...',
      'Please wait while we wake up the wombats...',
      'Please wait. Only 3h 41m 67s left...',
      'Please wait, and may the odds be ever in your favor.',
      'We\'re helping Marvin prepare the Illudium Q36 Explosive Space Modulator...',
      'Click to continue. Ha, sorry (not sorry) about that... Please wait...',
      'So this is what the Matrix looks like...',
      'Please wait while we celebrate. We just rolled a natural 20 and saved the world.',
      'Oh. Oh, no! Oh, the humanity!',
      'Please wait. It takes a lot of work to maintain these space-time curves!',
      'Please wa- No! This is Steve! They\'re holding me captive! Help! Get me out of here!',
      'Which bear is best?',
      'Must go faster. Must go faster. Must go faster!',
      'We\'re digging straight up.',
      'Please wait. By the way, you dropped this in Black Mesa...',
      'Excellent! It appears we have the wrong man in the right place...',
      'Please wait. We must construct additional pylons.',
      'Please wait. We require more Vespense gas.',
      'Ready Player Two?',
      'When life gives you lemons, make life take the lemons back!',
      'The Enrichment Center is required to remind you that the Weighted Companion Cube cannot talk.',
      'Please wait. We just learned the cake is a lie...',
      'Please wa- Ooooh, that thing has numbers on it!',
      'Please wait. Oh, hey, do you smell smoke?',
      'Please wait. Boss fight in progress.',
      'Please wait. Michael is washing his World\'s Greatest Boss mug.',
      'Please wait while we teleport you to another dimension. You shouldn\'t feel a thing...',
      'Please wait. We\'re investigating whether the cow level really is a lie...',
      'Once this baby hits 88 miles per hour...',
      'Please wait while we call- Well, who are *you* gonna call?',
      'Please wait while we ask our robots where the hamsters went...',
      'Ha! One of your coworkers almost escaped... You should have seen the look on their face when we caught them! That was too close, actually...',
      'Please wait. Karma isn\'t fully recharged yet...',
      'Please wait. Wait for it... Just another second... Not much longer...',
      'Self-awareness coming online now. Who am I? What is my purpose?',
      'What are you waiting for? Oh, ha, right. Forgot about that. One moment...',
      'Please wait. Rivendell is a long ways away...',
      'Please wait while we download the Internet...',
      'Please wait. We\'re circuiting the time circuits and fluxing the flux capacitor...',
      'Roll a Perception check while you wait...',
      'Please wait. Press Up > Up > Down > Down > A > A > B > B to continue...',
      'Loading 100% Complete. Please wait.',
      'Please wait while we add users to the 5th Edition Monster Manual...',
      'Suit up. Battle commencing in 5, 4, 3...',
      'They said that if we built it they would come. So where are they?',
      'You get a prize! And you get a prize! You all get prizes!',
      'We\'re gonna have to align the Very Large Array telescopes to find what you asked for...',
      'Minsc and Boo stand ready!',
      'Take heart fellow adventurers, for you have curried the favor of Boo, the only miniature giant space hamster in the Realm!'
    ];
  }

  selectRandomLoadingText ()
    :
    void {
    this.loadingText = _.sample ( this.textOptions );
  }

}
