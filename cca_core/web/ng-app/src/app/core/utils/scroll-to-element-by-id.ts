export function scrollToElementById ( id: string, options = null ): void {
  let element = document.getElementById ( id );
  if ( element ) {
    element.scrollIntoView (options);
  }
}
