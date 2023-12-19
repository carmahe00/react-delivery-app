FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install -g typescript
RUN npm install -g rimraf
RUN npm install -g ts-node
RUN npm install

CMD ["npm", "start"]