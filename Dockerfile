FROM node:18.13.0-alpine AS build

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

RUN yarn global add pm2

COPY . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3030

EXPOSE ${PORT}
CMD [ "pm2-runtime", "index.js" ]