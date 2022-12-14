############################################################
#                      BUILD IMAGE                         #
############################################################
FROM node:16.14.0-alpine as dev

RUN mkdir -p /opt/project
WORKDIR /opt/project

ENV PORT=8080
ENV HUSKY_SKIP_INSTALL=true

# Copy sources
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./swagger.yaml ./swagger.yaml
COPY ./src ./src

# Install dependencies
RUN npm install --production=false

ENV PORT=8080
EXPOSE $PORT

ENTRYPOINT ["npm", "run", "start"]


############################################################
#                      RUN IMAGE                           #
############################################################
FROM dev as runner
ENV PORT=8080
RUN npm ci --production
USER node
EXPOSE $PORT
ENTRYPOINT [ "npm", "run", "serve" ]


############################################################
#                INTEGRATION TEST IMAGE                    #
############################################################
FROM dev as integrator
RUN mkdir /opt/coverage

COPY ./jest.config.js ./jest.config.js
COPY ./test ./test

ENTRYPOINT ["npm", "run", "test:ci:integration"]

