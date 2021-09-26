import { EventDto, RegisterUserDto } from '../interfaces';

import { User, Event } from '.prisma/client';

export const registerUsers = (data: RegisterUserDto): Promise<User> => {
  return fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(async (r) => {
    if (r.ok) return await r.json();
    else throw await r.text();
  });
};

export const getEvents = (): Promise<Event[]> => {
  return fetch('/api/events').then(async (r) => {
    if (r.ok) return await r.json();
    else throw await r.text();
  });
};

export const createEvent = (data: EventDto): Promise<Event> => {
  return fetch('/api/events', { method: 'POST', body: JSON.stringify(data) }).then(async (r) => {
    if (r.ok) return await r.json();
    else throw await r.text();
  });
};
