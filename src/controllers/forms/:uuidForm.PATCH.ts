import { formService } from '@services'
import { NextFunction, Request, Response } from 'express'

export async function httpHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { uuidForm } = req.params
    const { items } = req.body

    return formService
        .updateItemsByUuid(uuidForm, { items })
        .then((form) => {
            res.json(form)
        })
        .catch((err) => next(err))
}
