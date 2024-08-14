FROM node:20-alpine

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "node", "server.js"]
