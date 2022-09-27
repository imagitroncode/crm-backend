FROM node:16.17.0-alpine3.15

ENV ENV_NAME=docker

RUN yarn global add @nestjs/cli

WORKDIR /var/app

COPY app/package.json app/yarn.lock app/tsconfig.json app/tsconfig.build.json ./

RUN yarn install

COPY app/src ./src

RUN yarn build

CMD ["yarn", "start:prod"]

EXPOSE 80