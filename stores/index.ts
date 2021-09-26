import { createContext } from 'react';
import { enableStaticRendering } from 'mobx-react-lite';

import { AppState } from './AppStore';

const isServer = typeof window === 'undefined';

enableStaticRendering(isServer);

export const storesContext = createContext({
  appState: new AppState(),
});
