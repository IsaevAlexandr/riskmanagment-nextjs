import { createContext } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';

import { AppState } from './AppStore';
import { EventsStore } from './EventsStore';
import { EventFormState } from './EventFormState';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

export const storesContext = createContext({
  appState: new AppState(),
  events: new EventsStore(),
  eventForm: new EventFormState(),
});
