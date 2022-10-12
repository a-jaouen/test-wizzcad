import bodyParser from 'body-parser'
import express, { Application, Express } from 'express'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

import * as controllers from '@controllers'
import { initDB } from '@database/knex'
import { boomify, errorHandler } from '@middlewares'

const { API_PREFIX = '/v1' } = process.env

/**
 * This function is meant to instantiate services
 */
async function initServices(): Promise<void> {
    console.log(`\x1b[36mInitializing services...\x1b[36m`)

    await Promise.all([initDB()])
}

async function getApplication(): Promise<Express> {
    await initServices()

    const application = express()
    application.disable('x-powered-by')

    applyRequestMiddleWares(application)
    applyRoutes(application, API_PREFIX)
    applyResponseMiddleWares(application)

    return application
}
export default getApplication

/**
 * Apply the request middlewares to the specified express application
 * @param app the express application
 * @param prefix the api url prefix
 */
function applyRequestMiddleWares(app: Application): void {
    // setting Swagger
    const swaggerDocumentPath = path.join(__dirname, '../swagger.yaml')
    const swaggerDocument = yaml.load(swaggerDocumentPath)
    const options = {
        swaggerOptions: {
            filter: true,
            validatorUrl: null,
        },
    }

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

    // setting bodyParser
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
}

/**
 * Apply the routes to the specified express application
 * @param app the express application
 * @param prefix the api url prefix
 */
export function applyRoutes(app: Application, prefix: string): void {
    app.use('', controllers.routerCore)
    app.use(prefix + '/forms', controllers.routerForm)
    process.env.DEBUG && console.debug('Router / has => ' + JSON.stringify(controllers.routerCore.stack))

    // The 404 Route (ALWAYS Keep this as the last route)
    app.get('*', (req, res): any => res.status(404).send('Not Found ¯\\_(ツ)_/¯'))
    process.env.DEBUG && console.debug('App has => ' + JSON.stringify(app._router.stack))
}

/**
 * Apply the response middlewares to the specified express application
 * @param app the express application
 */
function applyResponseMiddleWares(app: Application): void {
    app.use(boomify)
    app.use(errorHandler)
}
