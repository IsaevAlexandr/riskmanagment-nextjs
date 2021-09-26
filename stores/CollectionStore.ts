import { action, computed, makeObservable, observable } from 'mobx';

import { Collection, Comparator, SortTypes } from '../interfaces';

// TODO: зачем тут интерфейс коллекции?
export class CollectionStore<T> implements Collection<T> {
  byId: Record<string, T> = {};
  ids: string[] = [];
  defaultIds: string[] = [];
  colSortDirs: Partial<Record<keyof T, SortTypes>> = {};

  constructor(private accessor: (p: T) => string) {
    makeObservable(this, {
      byId: observable,
      defaultIds: observable,
      ids: observable,
      colSortDirs: observable,
      data: computed,
      deleteById: action,
      reset: action,
      setData: action,
      sortByProp: action,
      addData: action,
    });
  }

  get data() {
    const result = this.ids.map((id) => this.byId[id]);

    return result;
  }

  deleteById = (itemId: string) => {
    delete this.byId[itemId];
    this.ids = this.ids.filter((id) => id !== itemId);
  };

  reset = () => {
    this.byId = {};
    this.ids = [];
    this.defaultIds = [];
  };

  setData = (data: T[]) => {
    this.reset();

    for (const item of data) {
      this.addItem(item);
    }
  };

  private addItem = (item: T) => {
    const key = this.accessor(item);

    this.byId[key] = item;
    this.ids.push(key);
    this.defaultIds.push(key);
  };

  addData = (data: T | T[]) => {
    if (Array.isArray(data)) {
      for (const item of data) {
        this.addItem(item);
      }
    } else {
      this.addItem(data);
    }
  };

  private sort = (comparator: Comparator<T>) => {
    this.ids = this.defaultIds.sort((a, b) => comparator(this.byId[a], this.byId[b]));
  };

  sortByProp = (propName: keyof T, sortDir: SortTypes) => {
    this.sort((a, b) => {
      const valueA = a[propName];
      const valueB = b[propName];
      let sortVal: -1 | 0 | 1 = 0;

      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === 'DESC') {
        sortVal = (sortVal * -1) as -1 | 0 | 1;
      }

      return sortVal;
    });

    this.colSortDirs = {
      [propName]: sortDir,
    } as Record<keyof T, SortTypes>;
  };
}
