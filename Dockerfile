FROM node:alpine

RUN mkdir -p /usr/lumberer
WORKDIR /usr/lumberer

ENV SERVER_PORT=9914

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 9914
