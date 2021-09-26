import remotedev, { RemoteDevConfig } from 'mobx-remotedev';

export const addToDevtools = (store: object, opts?: RemoteDevConfig) => {
  if (process.env.NODE_ENV !== 'production') {
    remotedev(store, opts);
  }
};
