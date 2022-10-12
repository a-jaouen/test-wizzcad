import { formService } from '@services'
import { NextFunction, Request, Response } from 'express'

export async function httpHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
    return formService
        .getAll()
        .then((forms) => {
            res.json(forms)
        })
        .catch((err) => next(err))
}
