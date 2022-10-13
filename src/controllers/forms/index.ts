import { addAllRoutesToRouter, expUUIDCheck } from '@shared/helpers'
import { RoutesInfos } from '@shared/internal_types'
import { Router } from 'express'

import { httpHandler as handlerGETForm } from './:uuidForm.GET'
import { httpHandler as handlerGET } from './GET'
import { httpHandler as handlerPOST } from './POST'
import { httpHandler as handlerPATCHForm } from './:uuidForm.PATCH'
import { archiveHandlerHelper as handlerPUTArchiveHelper } from './archive'

const router = Router()

const handlerTable: RoutesInfos = {
    get: [
        { path: '/', handler: handlerGET },
        { path: `/:uuidForm(${expUUIDCheck})`, handler: handlerGETForm },
    ],
    post: [{ path: '/', handler: handlerPOST }],
    patch: [{ path: `/:uuidForm(${expUUIDCheck})`, handler: handlerPATCHForm }],
    put: [
        { path: `/:uuidForm(${expUUIDCheck})/archive`, handler: handlerPUTArchiveHelper(true) },
        { path: `/:uuidForm(${expUUIDCheck})/unarchive`, handler: handlerPUTArchiveHelper(false) },
    ],
}

addAllRoutesToRouter(router, '', handlerTable)

export const routerForm = router
