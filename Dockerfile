# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

ENV MONGODB_URL=
ENV NEXT_PUBLIC_MAIN_DOMAIN=
ENV NEXT_PUBLIC_AUTH_DOMAIN=
ENV NEXT_PUBLIC_WEBMAIL_DOMAIN=

CMD npm run build && npm run start
