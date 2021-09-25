import crypto from 'crypto';

import { Credentials } from '.prisma/client';

export const getCredentialsFromPassword = function (password: string) {
  const salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

  return {
    salt,
    hash,
  };
};

export const validateUserPassword = function (
  { salt, hash }: Credentials,
  password: string,
): boolean {
  const hashFromInput = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash === hashFromInput;
};
