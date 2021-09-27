import { makeAutoObservable } from 'mobx';

import { addToDevtools } from './addToDevtools';

type OnFormSubmit<T> = (fs: T) => void;

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
    this.onSubmit = () => {};
  };

  open = ({ formSt, onSubmit }: { formSt?: T; onSubmit: OnFormSubmit<T> }) => {
    if (formSt) {
      this.initialState = formSt;
    }
    this.isOpen = true;
    this.onSubmit = onSubmit;
  };

  onClose = () => {
    this.reset();
    this.isOpen = false;
  };

  onSubmit: OnFormSubmit<T> = () => {};
}
