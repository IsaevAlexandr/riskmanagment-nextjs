import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { EventDto } from '../../interfaces';
import { prismaClient } from '../../utils/prismaClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send('Forbidden');
    res.end();
  } else {
    if (req.method === 'GET') {
      const events = await prismaClient.event.findMany();

      res.status(200).json(events);
    } else if (req.method === 'POST') {
      const payload = JSON.parse(req.body) as EventDto;

      try {
        const createdEvent = await prismaClient.event.create({ data: payload });
        res.status(201).json(createdEvent);
      } catch (e) {
        return res.status(400).send(String(e));
      }
    } else {
      res.status(404).send('Nothing found');
    }
  }
};
