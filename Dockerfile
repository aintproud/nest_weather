FROM node:20

WORKDIR /dir/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/main"]