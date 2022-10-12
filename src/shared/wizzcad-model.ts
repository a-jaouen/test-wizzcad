/**
 * This enum represents all the possible field kinds
 */
export enum FieldKinds {
    string = 'string',
    integer = 'integer',
    decimal = 'decimal',
    percentage = 'percentage',
    boolean = 'boolean',
    array = 'array',
}

/**
 * This enum represents all the possible object kinds
 */
export enum ObjectKind {
    field = 'field',
    section = 'section',
    form = 'form',
}

interface BasicFormObject {
    /**
     * This field is used as a discriminator to type properly the basic form objects
     */
    objectKind: ObjectKind
}

/**
 * This interface represents a basic field of a form
 */
export interface Field extends BasicFormObject {
    objectKind: ObjectKind.field
    /**
     * The kind of the field
     */
    fieldKind: FieldKinds
    /**
     * (optional) Defines if the field is required or not
     */
    required?: boolean
    /**
     * (optional) The name of the field
     */
    name?: string
}

/**
 * This interface represents a section of a form
 */
export interface Section {
    objectKind: ObjectKind.section
    /**
     * The underlying items of the section
     */
    items: (Field | Section)[]
}

/**
 * This interface represents a creation request of a form
 */
export interface FormRequest {
    objectKind: ObjectKind.form
    /**
     * The underlying items of the form
     */
    items: (Field | Section)[]
}

export interface Form extends FormRequest {
    /**
     * The uuid of the form
     */
    uuid: string
    /**
     * Represents if the object is archived or not. When archived the form is not accessible through GET forms or GET form by id
     */
    archived: boolean
}
