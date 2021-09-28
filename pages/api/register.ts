import { NextApiRequest, NextApiResponse } from 'next';

import { RegisterUserDto } from '../../interfaces';
import { getCredentialsFromPassword } from '../../utils';
import { prismaClient } from '../../prisma/prismaClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = JSON.parse(req.body) as RegisterUserDto;

    const isUserInDb = await prismaClient.user.findUnique({
      where: { username },
    });

    if (isUserInDb) {
      return res.status(409).send(`Пользователь с именем ${username} уже существует`);
    }

    try {
      const user = await prismaClient.user.create({
        data: { username },
      });

      await prismaClient.credentials.create({
        data: {
          ...getCredentialsFromPassword(password),
          user: { connect: { id: user.id } },
        },
      });

      res.status(201).json(user);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
