FROM node:20.2-alpine3.17

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 8888

COPY . .

# CMD npm run dev
