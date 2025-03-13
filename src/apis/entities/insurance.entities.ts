export interface FormFieldType {
    id: string;
    label: string;
    type:
        | 'group'
        | 'text'
        | 'date'
        | 'select'
        | 'radio'
        | 'number'
        | 'checkbox';
    required?: boolean;
    fields?: FormFieldType[];
    options?: string[];
    dynamicOptions?: {
        dependsOn: string;
        endpoint: string;
        method: 'GET';
    };
    visibility?: {
        dependsOn: string;
        condition: 'equals';
        value: 'Yes' | 'No';
    };
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
    };
}

export interface InsuranceFormResponseType {
    formId: string;
    title: string;
    fields: FormFieldType[];
}
export interface StatesResponseType {
    country: string;
    states: string[];
}

export interface InsuranceFormSubmitResponseType {
    message: string;
    status: 'success';
}

export interface InsuranceFormSubmitRequestType {
    structure: string;
}

export interface InsuranceFormSubmissionResponseType {
    columns: string[];
    data: any[];
}
