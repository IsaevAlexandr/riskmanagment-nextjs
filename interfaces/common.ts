export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export interface Comparator<T> {
  (v1: T, v2: T): 1 | -1 | 0;
}

export interface Collection<T> {
  byId: Record<string, T>;
  defaultIds: string[];
  ids: string[];
  data: T[];
  deleteById(id: string): void;
  setData(p: T[]): void;
  reset(): void;
}

export type SortTypes = 'ASC' | 'DESC';
