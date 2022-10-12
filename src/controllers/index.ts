import { addAllRoutesToRouter } from '@shared/helpers'
import { RoutesInfos } from '@shared/internal_types'
import { Router, Request, Response } from 'express'

export * from './forms'

const router = Router()

const rootHandler = (req: Request, res: Response): any => {
    if (req.accepts('html')) {
        res.send(
            '<h1>WIZZCAD model service</h1>' +
                '<p> > This is an API of the service, please see <a href="/docs">here for its documentation</a></p>'
        )
        return
    }

    res.json({ ok: true })
}

const handlerHealth = (req: Request, res: Response): any => {
    if (req.accepts('html')) {
        res.send('<p>All good and happy</p>')
        return
    }

    res.json({ ok: true })
}

const handlersRoot: RoutesInfos = {
    get: [
        { path: '/', handler: rootHandler },
        { path: '/health', handler: handlerHealth },
    ],
}

addAllRoutesToRouter(router, '', handlersRoot)

export const routerCore = router
