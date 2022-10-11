# Interfaces API and components

Interfaces

## Requirements

-   Docker 20.10 or later
-   Node.js 16.14.0
-   npm 8.3.1

## Local development

### Set up project

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

### Unit test

```bash
npm run test
```

### Environment variables

-   NODE_ENV
    -   description: The node environment (will toggle logs, typing errors, CORS: allowed URLs to '\*' ...)
    -   allowed values: development, production
    -   default value: development
-   PORT
    -   description: The port to which server listens to
    -   default value: random

## Dockerized Environment

### How to

A pre-configured environment has been set into `./docker-compose.yaml`. It will launch `wizzcad-model`.

First, you build your docker image. Then, you launch it into docker service(s):

```bash
docker-compose build wizzcad-model-api
docker-compose up wizzcad-model-api
```

If you want to stop service(s):

```bash
docker-compose down
```

> Note: relaunch these commands everytime you want to rebuild your services

### Live documentation

The server comes with its swagger documentation page (only when deployed with NODE_ENV=development)

You can access it at: [http://{URL}/{API_PREFIX}/docs/]()

Example: [http://localhost:8080/docs](http://localhost:8080/docs)
