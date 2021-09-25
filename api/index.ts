import { User } from ".prisma/client";
import { RegisterUserDto } from "../interfaces";

export const registerUsers = (data: RegisterUserDto): Promise<User> => {
  return fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(async (r) => {
    if (r.ok) return await r.json();
    else throw await r.text();
  });
};
