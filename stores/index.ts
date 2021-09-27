import { createContext } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';

import { AppState } from './AppStore';
import { EventsStore } from './EventsStore';
import { RisksStore } from './RisksStore';
import { FormState } from './FormState';
import { ImageModalStore } from './ImageModalStore';

import { Event, Risk } from '.prisma/client';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

export const storesContext = createContext({
  appState: new AppState(),
  events: new EventsStore(),
  risks: new RisksStore(),
  eventForm: new FormState<Event>(),
  riskForm: new FormState<Risk>(),
  imageModal: new ImageModalStore(),
});
