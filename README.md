# The WIZZCAD model API

This service is used to store the WIZZCAD forms.

In this document you will find everything needed to start contributing on the project. Everything has been containerized to ease developpers setup thanks to docker, git hooks, etc.

## What to expect in this delivery

-   A minimal interface to serve the WIZZCAD forms, ready to be deployed on your favorite cloud environment. Create, read, update, archive, unarchive forms capabilities have been done.
-   In store/postgresql, you will find everything needed to seed your staging, demos or production environments.
-   A small example of swagger documentation hosted server.
-   One BDD integration test on the /health endpoint
-   Configuration files to help harmonizing code and methodology between contributing developpers

## What I could have done to go further

-   Form versioning to keep track of all the evolutions of all forms.
-   More tests and all endpoints documented
-   Implementing authentification

## Requirements

-   Docker 20.10 or later
-   Node.js 16.14.0 (if running locally)
-   npm 8.3.1 (if running locally)

## Local development

### Dockerized Environment (preferred way)

A pre-configured environment has been set into `./docker-compose.yaml`.

First, you build your docker image. Then, you launch it into docker service(s):

```bash
docker-compose build wizzcad-model-api wizzcad-model-db
docker-compose up wizzcad-model-api wizzcad-model-db
```

If you want to stop service(s):

```bash
docker-compose down
```

If you want to stop service(s) and empty the database:

```bash
docker-compose down -v
```

> Note: relaunch these commands everytime you want to rebuild your services

### Set up project locally

If you want to develop locally or setup your IDE

```bash
npm install
```

You may need to set up your environment variables (see Environment variables). You can change them if you know what you are doing.

```bash
cp .env.sample .env
```

Then you start the app

```bash
npm run start
```

## Integration test

Choice has been made to only do integration tests for this project. Note it's not meant to cover all cases but to demonstrate testing capabilities.

```bash
docker-compose build wizzcad-model-integrator
docker-compose run wizzcad-model-integrator
```

## Environment variables

-   NODE_ENV
    -   description: The node environment (will toggle logs, typing errors, CORS: allowed URLs to '\*' ...). Not implemented yet.
    -   allowed values: development, production
    -   default value: development
-   PORT
    -   description: The port to which server listens to
    -   default value: random
-   DB_ENV
    -   description: The env where the database is running
    -   allowed values: development, production
    -   default value: development
-   DB_HOST
    -   description: The host URL of the database
-   DB_PORT
    -   description: The port of the database
-   DB_NAME
    -   description: The name of the database
-   DB_USER
    -   description: The username used to log in to the database
-   DB_PASSWD
    -   description: The password used to log in to the database

## Live documentation

The server comes with its swagger documentation page

You can access it at: [http://{URL}/{API_PREFIX}/docs/]()

Example: [http://localhost:8080/docs](http://localhost:8080/docs)

> Note: only the /health endpoint has been documented in this project
