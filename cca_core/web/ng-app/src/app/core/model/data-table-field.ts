export interface DataTableField<T> {
  key: string;
  label: string;
  getValue: ( item: T ) => string | number;
}
