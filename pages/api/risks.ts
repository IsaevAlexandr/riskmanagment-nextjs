import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { RiskDto } from '../../interfaces';
import { prismaClient } from '../../utils/prismaClient';

import { Risk } from '.prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

        const createdRisk = await prismaClient.risk.create({ data: payload });
        res.status(201).json(createdRisk);
      } else if (req.method === 'PUT') {
        const payload = JSON.parse(req.body) as Risk;

        const updatedRisk = await prismaClient.risk.update({
          data: payload,
          where: { id: payload.id },
        });

        return res.status(200).json(updatedRisk);
      } else if (req.method === 'DELETE') {
        const payload = JSON.parse(req.body) as Risk;

        const deletedRisk = await prismaClient.risk.delete({ where: { id: payload.id } });

        return res.status(200).json(deletedRisk);
      } else {
        res.status(404).send('Nothing found');
      }
    }
  } catch (e) {
    return res.status(400).send(String(e));
  }
};
