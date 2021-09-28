import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { prismaClient } from '../../prisma/prismaClient';

import { Event } from '.prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(403).send('Forbidden');
    } else {
      switch (req.method) {
        case 'GET':
          {
            const events = await prismaClient.event.findMany();

            res.status(200).json(events);
          }
          break;
        case 'POST':
          {
            const payload = JSON.parse(req.body) as Event;

            const createdEvent = await prismaClient.event.create({ data: payload });

            res.status(201).json(createdEvent);
          }
          break;
        case 'PUT':
          {
            const payload = JSON.parse(req.body) as Event;

            const updatedEvent = await prismaClient.event.update({
              data: payload,
              where: { id: payload.id },
            });

            res.status(200).json(updatedEvent);
          }
          break;
        case 'DELETE':
          {
            const payload = JSON.parse(req.body) as Event;

            const deletedEvent = await prismaClient.event.delete({ where: { id: payload.id } });

            res.status(200).json(deletedEvent);
          }
          break;
        default: {
          res.status(404).send('Nothing found');
        }
      }
    }
  } catch (e) {
    res.status(400).send(String(e));
  }

  res.end();
};
