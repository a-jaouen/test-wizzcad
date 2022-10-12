import { knexGlobal, KnexSingleton } from '@database/knex'
import * as forms from '@database/models/forms'
import { Form, FormItems, FormRequest } from '@shared/wizzcad-model'

export class FormService {
    constructor(private knexInstance: KnexSingleton) {}

    public async insert(formRequest: FormRequest): Promise<Form> {
        const dbconn = this.knexInstance.getInstance()
        if (!dbconn) {
            throw new Error('Unable to obtain db connection to insert')
        }

        return await forms.insert(dbconn, formRequest)
    }

    public async updateItemsByUuid(uuid: string, items: FormItems): Promise<Form> {
        const dbconn = this.knexInstance.getInstance()
        if (!dbconn) {
            throw new Error('Unable to obtain db connection to insert')
        }

        return await forms.updateByUuid(dbconn, uuid, items)
    }

    public async getAll(): Promise<Form[]> {
        const dbconn = this.knexInstance.getInstance()
        if (!dbconn) {
            throw new Error('Unable to obtain db connection to insert')
        }

        return await forms.getAllForms(dbconn)
    }

    public async get(uuid: string): Promise<Form | undefined> {
        const dbconn = this.knexInstance.getInstance()
        if (!dbconn) {
            throw new Error('Unable to obtain db connection to insert')
        }

        return await forms.getForm(dbconn, uuid)
    }
}

export const formService = new FormService(knexGlobal)
