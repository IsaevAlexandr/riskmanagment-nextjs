import { addToDevtools } from './addToDevtools';
import { CollectionStore } from './CollectionStore';

import { Event } from '.prisma/client';

export class EventsStore extends CollectionStore<Event> {
  constructor() {
    super((x) => String(x.id));

    addToDevtools(this, {
      name: this.constructor.name,
    });
  }
}
