import { Request, Response, NextFunction } from 'express'
import Boom from 'boom'

export function developmentErrorHandler(err: Boom, req: Request, res: Response, next: NextFunction): any {
    if (res.headersSent) {
        return next(err)
    }

    const { statusCode, payload } = err.output
    const { data } = err

    return res.status(statusCode).json({ ...payload, data, err })
}

export function productionErrorHandler(err: Boom, req: Request, res: Response, next: NextFunction): any {
    console.error(err)

    if (res.headersSent) {
        return next(err)
    }

    const { statusCode, payload } = err.output
    const { data } = err

    return res.status(statusCode).json({ ...payload, data })
}

export const errorHandler = ['development', 'staging'].includes(process.env.STAGE || 'error')
    ? developmentErrorHandler
    : productionErrorHandler
