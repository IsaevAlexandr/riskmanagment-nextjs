import { createContext } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';

import { AppState } from './AppStore';
import { EventsStore } from './EventsStore';
import { RisksStore } from './RisksStore';
import { FormState } from './FormState';

import { Event, Risk } from '.prisma/client';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

type EventFormState = Omit<Event, 'id'> & { id?: number };
type RiskFormState = Omit<Risk, 'id'> & { id?: number };

export const storesContext = createContext({
  appState: new AppState(),
  events: new EventsStore(),
  risks: new RisksStore(),
  eventForm: new FormState<EventFormState>(),
  riskForm: new FormState<RiskFormState>(),
});
