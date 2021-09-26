import { Event, Risk } from '.prisma/client';

export interface RegisterUserDto {
  username: string;
  password: string;
}

export type EventDto = Omit<Event, 'id'>;
export type RiskDto = Omit<Risk, 'id'>;
