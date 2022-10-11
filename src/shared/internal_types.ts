import { RequestHandler } from 'express'

export interface HandlerInfos {
    path: string
    handler: RequestHandler
}

export interface RoutesInfos {
    get?: HandlerInfos[] | HandlerInfos
    post?: HandlerInfos[] | HandlerInfos
    put?: HandlerInfos[] | HandlerInfos
    patch?: HandlerInfos[] | HandlerInfos
    delete?: HandlerInfos[] | HandlerInfos
    [key: string]: HandlerInfos | HandlerInfos[] | undefined
}

