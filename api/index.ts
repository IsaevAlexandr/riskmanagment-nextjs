import { RegisterUserDto } from '../interfaces';

import { User, Event, Risk } from '.prisma/client';

export const registerUsers = (data: RegisterUserDto): Promise<User> => {
  return fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(async (r) => {
    if (r.ok) return await r.json();
    else throw await r.text();
  });
};

const kindergartenResponseHandler = (p: Promise<Response>) =>
  p.then(async (r) => {
    if (r.ok) return await r.json();
    else throw await r.text();
  });

function makeSimpleCrudApi<T>(path: string) {
  return {
    get: (): Promise<T[]> => kindergartenResponseHandler(fetch(path)),
    post: (d: T): Promise<T> =>
      kindergartenResponseHandler(fetch(path, { method: 'POST', body: JSON.stringify(d) })),
    put: (d: T): Promise<T> =>
      kindergartenResponseHandler(fetch(path, { method: 'PUT', body: JSON.stringify(d) })),
    delete: (d: T): Promise<T> =>
      kindergartenResponseHandler(fetch(path, { method: 'DELETE', body: JSON.stringify(d) })),
  };
}

export const riskCrudApi = makeSimpleCrudApi<Risk>('/api/risks');
export const eventCrudApi = makeSimpleCrudApi<Event>('/api/events');
