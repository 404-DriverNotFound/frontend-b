FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --silent

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
