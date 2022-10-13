import { formService } from '@services'
import { NextFunction, Request, RequestHandler, Response } from 'express'

/**
 * This function helps you create a handler to archive/unarchive a form by uuid
 * @param archived a boolean reprensenting if the handler should archive or unarchive the form
 * @returns a handler
 */
export function archiveHandlerHelper(archived: boolean): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { uuidForm } = req.params

        return formService
            .updateItemsByUuid(uuidForm, { archived })
            .then((form) => {
                res.json(form)
            })
            .catch((err) => next(err))
    }
}
