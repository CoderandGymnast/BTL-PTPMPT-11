FROM node:12
WORKDIR /vsean/src/app
COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","dist/main"]