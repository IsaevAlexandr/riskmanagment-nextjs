export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export interface Comparator<T> {
  (v1: T, v2: T): 1 | -1 | 0;
}

export type SortTypes = 'ASC' | 'DESC';

export type RiskFactor = '1' | '2' | '3' | '4' | '5';
