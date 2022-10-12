import Knex from 'knex'

const { DB_HOST, DB_PORT, DB_NAME = 'wizzcad', DB_SCHEMA = 'wizzcad', DB_ENV = 'development' } = process.env

export class KnexSingleton {
    private static knexInstance: Knex | undefined

    public initKnex(nameUser: string, passUser: string): void {
        KnexSingleton.knexInstance = Knex({
            client: 'pg',
            connection: {
                host: DB_HOST,
                port: Number(DB_PORT),
                database: DB_NAME,
                user: nameUser,
                password: passUser,
            },
            debug: DB_ENV === 'development',
            searchPath: [DB_SCHEMA],
            pool: {
                afterCreate: (conn: any, done: any, err: any) => {
                    console.log('PostgreSQL: Pool connected')
                    done(err, conn)
                },
                min: 2,
                max: 10,
            },
            acquireConnectionTimeout: 2000,
        })
    }

    public getInstance(): Knex | undefined {
        return KnexSingleton.knexInstance
    }
}

export const knexGlobal = new KnexSingleton()

export async function initDB(): Promise<void> {
    console.debug('[Knex] Initializing db')

    if (!process.env.DB_USER || !process.env.DB_PASSWD) {
        console.error(`\x1b[31m💀 Database credentials missing\x1b[31m`)
        return
    }

    knexGlobal.initKnex(process.env.DB_USER, process.env.DB_PASSWD)
}
