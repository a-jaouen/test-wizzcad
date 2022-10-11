import { HandlerInfos, RoutesInfos } from '@shared/internal_types'
import { ErrorRequestHandler, RequestHandler, Router } from 'express'

export function addAllRoutesToRouter(routerToAddTo: Router, routePrefix: string, handlers: RoutesInfos): void {
    Object.keys(handlers).map((currentHTTPType: string) => {
        let infosHandlers: HandlerInfos | HandlerInfos[] | undefined = handlers[currentHTTPType]
        if (!infosHandlers) infosHandlers = []
        if (!Array.isArray(infosHandlers)) infosHandlers = [infosHandlers]

        infosHandlers.forEach((currentHandler) =>
            addHandlerToRouter(
                routerToAddTo,
                currentHTTPType,
                routePrefix + currentHandler.path,
                currentHandler.handler
            )
        )
    })
}

export function addHandlerToRouter(
    routerToAddTo: Router,
    typeHTTP: string,
    pathRoute: string,
    handlerRoute: RequestHandler
): void {
    const handlers: Array<RequestHandler | ErrorRequestHandler> = [handlerRoute]

    switch (typeHTTP.toLowerCase()) {
        case 'get':
            routerToAddTo.get(pathRoute, handlers)
            break
        case 'post':
            routerToAddTo.post(pathRoute, handlers)
            break
        case 'put':
            routerToAddTo.put(pathRoute, handlers)
            break
        case 'head':
            routerToAddTo.head(pathRoute, handlers)
            break
        default:
            console.log('service lacks routing for: ' + typeHTTP)
    }
}
