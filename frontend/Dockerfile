FROM node:20-alpine

WORKDIR /frontend

COPY package*.json .
COPY public/* .
COPY src/* .
COPY .env .

RUN npm install

EXPOSE 3000

Entrypoint ["npm", "start"]