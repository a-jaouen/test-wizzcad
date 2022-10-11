/**
 * This enum represents all the possible field kinds
 */
export enum FieldKinds {
    string,
    integer,
    decimal,
    percentage,
    boolean,
    array,
}

/**
 * This enum represents all the possible object kinds
 */
export enum ObjectKind {
    field,
    section,
    form,
}

interface BasicFormObject {
    /**
     * The uuid of the object
     */
    uuid: string
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
 * This interface represents a form
 */
export interface Form {
    objectKind: ObjectKind.form
    /**
     * The underlying items of the form
     */
    items: (Field | Section)[]
}
