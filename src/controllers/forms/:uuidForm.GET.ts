import { NextFunction, Request, Response } from 'express'
import boom from '@hapi/boom'
import { formService } from '@services'

export async function httpHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { uuidForm } = req.params

    return formService
        .get(uuidForm)
        .then((form) => {
            if (!form) {
                throw boom.notFound('Form not found')
            }

            res.json(form)
        })
        .catch((err) => next(err))
}
