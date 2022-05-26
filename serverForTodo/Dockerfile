FROM node:alpine
WORKDIR /api
COPY package.json /api/
COPY package-lock.json /api/
COPY ./ /api/
RUN npm i
EXPOSE 3001
CMD ["node", "app.js"]
