# To Create a new image
# docker build -t cardigame/cah:<version_num> .

# To Push a new image
# docker push cardigame/cah:<version num here optional>
####-------####-------####-------####-------####-------####-------####-------
FROM node:18-alpine

# Create app directory for express server
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

# npm i and build react build (production)
WORKDIR /usr/src/app/client
RUN yarn
RUN yarn run build

# go back to server and run it
WORKDIR /usr/src/app
CMD yarn run server

# run server on port
ENV PORT 8080
EXPOSE 8080

