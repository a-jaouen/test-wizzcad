import { Form, FormRequest, ObjectKind } from '@shared/wizzcad-model'
import Knex from 'knex'

export interface FormFields {
    uuid: string
    archived: boolean
    items: any
}

function db2ts(objectFromDB: FormFields): Form {
    const { uuid, archived, items } = objectFromDB

    return {
        uuid,
        archived,
        items,
        objectKind: ObjectKind.form,
    }
}

export async function insert(dbConnection: Knex, formRequest: FormRequest): Promise<Form> {
    const newForm = await dbConnection<FormFields>('forms')
        .withSchema('wizzcad')
        .insert({
            items: JSON.stringify(formRequest.items),
        })
        .returning('*')

    if (newForm && newForm.length > 0) {
        return db2ts(newForm[0])
    } else {
        throw new Error('Error while inserting new form')
    }
}

export async function getAllForms(dbConnection: Knex): Promise<Form[]> {
    const forms = await dbConnection<FormFields>('forms').withSchema('wizzcad').where({ archived: false })

    return forms.map((workflow) => db2ts(workflow))
}

export async function getForm(dbConnection: Knex, uuid: string): Promise<Form | undefined> {
    const query = dbConnection<FormFields>('forms').withSchema('wizzcad').where({ uuid, archived: false })
    const res = await query.first()

    return res ? db2ts(res) : undefined
}
