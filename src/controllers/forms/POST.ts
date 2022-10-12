import { formService } from '@services'
import { NextFunction, Request, Response } from 'express'

export async function httpHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
    const formRequest = req.body

    return formService
        .insert(formRequest)
        .then((form) => {
            res.json(form)
        })
        .catch((err) => next(err))
}
