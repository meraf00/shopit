FROM node:latest

WORKDIR /usr/src/packages

COPY package.json ./
COPY package-lock.json ./

COPY packages/shared/package.json ./packages/shared/package.json

RUN npm install

COPY . .

EXPOSE 3000

RUN npx turbo run build --filter=shared

CMD [ "node", "packages/shared/dist/main.js" ]