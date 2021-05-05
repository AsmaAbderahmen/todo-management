FROM node:14

WORKDIR /opt/app

COPY package*.json ./

RUN npm install -p

COPY build/ .

EXPOSE 4000

CMD [ "node", "app.js" ]
