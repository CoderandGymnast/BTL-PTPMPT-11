FROM node:16-alpine

WORKDIR /app/backend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001

CMD [ "node", "dist/main" ]