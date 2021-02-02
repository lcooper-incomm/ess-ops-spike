export class UUID {

  /**
   * Credit: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  public static generate (): string {
    let date = new Date ().getTime ();
    if ( window.performance && typeof window.performance.now === "function" ) {
      date += performance.now (); //use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace ( /[xy]/g, function ( c ) {
      var r = (date + Math.random () * 16) % 16 | 0;
      date  = Math.floor ( date / 16 );
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString ( 16 );
    } );
  }
}
