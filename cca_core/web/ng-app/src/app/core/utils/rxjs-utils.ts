import { flatMap, switchMap, mapTo, mergeMap, exhaustMap } from 'rxjs/operators';
import { Observable, MonoTypeOperatorFunction } from "rxjs";

/**
 * Like exhaustMap, but returns the value from the outer observable instead of replacing it.
 * @param project
 */
export function exhaustTap<T, R> ( project: ( value: T, index: number ) => Observable<R> ): MonoTypeOperatorFunction<T> {
  const mapProject = ( value: T, index: number ) => project ( value, index ).pipe ( mapTo ( value ) );
  return exhaustMap ( mapProject );
}

/**
 * Like flatMap, but returns the value from the outer observable instead of replacing it.
 * @param project
 */
export function flatTap<T, R> ( project: ( value: T, index: number ) => Observable<R> ): MonoTypeOperatorFunction<T> {
  const mapProject = ( value: T, index: number ) => project ( value, index ).pipe ( mapTo ( value ) );
  return flatMap ( mapProject );
}

/**
 * Like mergeMap, but returns the value from the outer observable instead of replacing it.
 * @param project
 */
export function mergeTap<T, R> ( project: ( value: T, index: number ) => Observable<R> ): MonoTypeOperatorFunction<T> {
  const mapProject = ( value: T, index: number ) => project ( value, index ).pipe ( mapTo ( value ) );
  return mergeMap ( mapProject );
}

/**
 * Like switchMap, but returns the value from the outer observable instead of replacing it.
 * @param project
 */
export function switchTap<T, R> ( project: ( value: T, index: number ) => Observable<R> ): MonoTypeOperatorFunction<T> {
  const mapProject = ( value: T, index: number ) => project ( value, index ).pipe ( mapTo ( value ) );
  return switchMap ( mapProject );
}
