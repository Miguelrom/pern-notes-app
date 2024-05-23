FROM node:20.10.0

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn

COPY . /usr/src/app

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]
