import { makeAutoObservable } from 'mobx';

import { addToDevtools } from './addToDevtools';

export class AppState {
  menuOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);

    addToDevtools(this, {
      name: this.constructor.name,
    });
  }

  toggleMenuOpen() {
    this.menuOpen = !this.menuOpen;
  }

  setMenuOpen(v: boolean) {
    this.menuOpen = v;
  }
}
