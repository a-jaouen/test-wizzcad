import _ from 'lodash'

/**
 * Converts the object's fields (coming from the db) to camelCase
 * @param objectFromDB
 * @return object with camelCase fields
 */
export function db2ts<T = any>(objectFromDB?: Record<string, any>): T | undefined {
    if (!objectFromDB) return undefined

    return <T>_.mapKeys(objectFromDB, (value: any, key: any) => _.camelCase(key))
}

/**
 * Converts the typescript object's fields to camelCase to match the db interface
 * @param tsObject
 * @return object with camelCase fields
 */
export function ts2db(tsObject?: Record<string, any>): any {
    if (!tsObject) return undefined

    return _.mapKeys(tsObject, (value: any, key: any) => _.snakeCase(key))
}
