import { makeObservable, action, observable } from 'mobx';

import { addToDevtools } from './addToDevtools';

export class AppState {
  menuOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      menuOpen: observable,
      setMenuOpen: action,
      toggleMenuOpen: action,
    });

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
