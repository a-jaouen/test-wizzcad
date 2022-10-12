import { addAllRoutesToRouter, expUUIDCheck } from '@shared/helpers'
import { RoutesInfos } from '@shared/internal_types'
import { Router } from 'express'

import { httpHandler as handlerGETForm } from './:uuidForm.GET'
import { httpHandler as handlerGET } from './GET'
import { httpHandler as handlerPOST } from './POST'

const router = Router()

const handlerTable: RoutesInfos = {
    get: [
        { path: '/', handler: handlerGET },
        { path: `/:uuidForm(${expUUIDCheck})`, handler: handlerGETForm },
    ],
    post: [{ path: '/', handler: handlerPOST }],
}

addAllRoutesToRouter(router, '', handlerTable)

export const routerForm = router
