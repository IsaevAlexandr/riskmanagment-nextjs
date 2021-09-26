import { makeAutoObservable } from 'mobx';

import { addToDevtools } from './addToDevtools';

export class FormState<T> {
  initialState: T;
  isOpen: boolean = false;

  constructor(initState?: T) {
    this.initialState = initState || this.getInitialState();
    makeAutoObservable(this);
    addToDevtools(this, {
      name: this.constructor.name,
    });
  }

  private getInitialState(): T {
    return {} as T;
  }

  reset = () => {
    this.initialState = this.getInitialState();
  };

  open = (formSt?: T) => {
    if (formSt) {
      this.initialState = formSt;
    }
    this.isOpen = true;
  };

  onClose = () => {
    this.reset();
    this.isOpen = false;
  };
}
