FROM node:18.12.1-alpine
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run-script build
EXPOSE 60000
CMD ["node", "index.js"]
