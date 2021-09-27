import { makeAutoObservable } from 'mobx';

export class ImageModalStore {
  isOpen: boolean = false;
  title: string = '';
  alt?: string;
  imageSrc: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setOpen = (p: { imageSrc: string; alt?: string; title: string }) => {
    this.isOpen = true;
    this.title = p.title;
    this.imageSrc = p.imageSrc;
    this.alt = p.alt;
  };

  onClose = () => {
    this.isOpen = false;
    this.alt = undefined;
  };
}
