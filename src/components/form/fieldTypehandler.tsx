import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import { Control, FieldValues, UseFormWatch } from 'react-hook-form';

interface FieldTypeHandlerType {
    field: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
}

const FieldTypeHandler: React.FC<FieldTypeHandlerType> = ({ field }) => {
    return (
        <div className="w-full flex flex-col mb-1">
            <span className="text-black font-medium text-md mb-1">
                {field.label}
            </span>
            <span className="text-black font-medium text-sm">{field.type}</span>
        </div>
    );
};

export default FieldTypeHandler;
