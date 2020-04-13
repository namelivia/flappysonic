FROM node:12.7.0-alpine
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 60000
CMD ["node", "index.js"]
