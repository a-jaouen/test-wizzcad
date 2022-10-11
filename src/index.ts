import 'source-map-support/register'
import http, { Server } from 'http'
import app from './app'

const { NODE_ENV, PORT } = process.env
const IP = '0.0.0.0'

console.log(`\x1b[36mStarting ${NODE_ENV} server...\x1b[36m`)

app().then((appli) => {
    const server = http.createServer(appli)

    server.listen(PORT, IP as any, (): void => {
        if (server.address()) {
            console.log(`\x1b[32m✔ Server listening at ${getServerAddress(server)}\x1b[32m`)
        } else {
            console.log(`\x1b[31m💀 No server address. The port ${PORT} was most likely already in use\x1b[31m`)
        }
    })

    server.on('error', (error: NodeJS.ErrnoException): void => {
        if (error.syscall !== 'listen') {
            throw error
        }

        const address = getServerAddress(server)

        switch (error.code) {
            case 'EACCES':
                console.log(`\x1b[31m${address} requires elevated privileges\x1b[31m`)
                process.exit(1)
                break
            case 'EADDRINUSE':
                console.log(`\x1b[31m${address} is already in use\x1b[31m`)
                process.exit(1)
                break
            default:
                throw error
        }
    })

    server.on('close', async () => {
        //await knexGlobal.getInstance()?.destroy()
    })

    process.on('SIGINT', function () {
        server.close()
    })

    function getServerAddress(srv: Server): string {
        const address = srv.address()
        if (!address) {
            return 'Unknown adress'
        }

        return typeof address === 'string' ? address : `${address.address}:${address.port}`
    }
})
