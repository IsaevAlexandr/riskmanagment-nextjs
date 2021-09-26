import { makeAutoObservable } from 'mobx';

import { addToDevtools } from './addToDevtools';

type FormState = Omit<Event, 'id'> & { id?: number };

export class EventFormState {
  initialState: FormState;
  isOpen: boolean = false;

  constructor(initState?: FormState) {
    this.initialState = initState || this.getInitialState();
    makeAutoObservable(this);
    addToDevtools(this, {
      name: this.constructor.name,
    });
  }

  private getInitialState(): FormState {
    return {} as FormState;
  }

  reset = () => {
    this.initialState = this.getInitialState();
  };

  open = (formSt?: FormState) => {
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
