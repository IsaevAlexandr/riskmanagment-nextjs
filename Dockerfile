FROM node:12

EXPOSE 8080

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm i

COPY . /usr/src/app

RUN npm run prisma:generate
RUN npm run build

CMD npm run start:prod