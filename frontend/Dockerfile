FROM node:20-alpine

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 5173
  
CMD ["yarn", "dev"]