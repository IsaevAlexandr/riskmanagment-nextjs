import { addToDevtools } from './addToDevtools';
import { CollectionStore } from './CollectionStore';

import { Risk } from '.prisma/client';

export class RisksStore extends CollectionStore<Risk> {
  constructor() {
    super((x) => String(x.id));

    addToDevtools(this, {
      name: this.constructor.name,
    });
  }
}
