FROM node:12.7.0-alpine
WORKDIR /app
COPY . /app
EXPOSE 60000
CMD ["./run"]
