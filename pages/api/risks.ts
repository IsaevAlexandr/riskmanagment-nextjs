import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { RiskDto } from '../../interfaces';
import { prismaClient } from '../../utils/prismaClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send('Forbidden');
    res.end();
  } else {
    if (req.method === 'GET') {
      const events = await prismaClient.risk.findMany();

      res.status(200).json(events);
    } else if (req.method === 'POST') {
      const payload = JSON.parse(req.body) as RiskDto;

      try {
        const createdRisk = await prismaClient.risk.create({ data: payload });
        res.status(201).json(createdRisk);
      } catch (e) {
        return res.status(400).send(String(e));
      }
    } else {
      res.status(404).send('Nothing found');
    }
  }
};
