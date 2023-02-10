FROM node:18.14.0-alpine3.16

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@7.5.6

USER node

WORKDIR /home/node/app