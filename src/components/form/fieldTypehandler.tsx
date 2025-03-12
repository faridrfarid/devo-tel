import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import {
    Control,
    FieldValues,
    UseFormWatch,
    UseFormResetField,
} from 'react-hook-form';
import FieldTextType from './fieldTextType';
import FieldSelectType from './fieldSelectType';

interface FieldTypeHandlerType {
    field: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    resetField: UseFormResetField<FieldValues>;
}

const FieldTypeHandler: React.FC<FieldTypeHandlerType> = ({
    field,
    watch,
    control,
    resetField,
}) => {
    return (
        <div className="w-full flex flex-col mb-1">
            <span className="text-black font-medium text-md mb-1">
                {field.label}
            </span>
            {field.type === 'text' && (
                <FieldTextType
                    watch={watch}
                    control={control}
                    fieldContent={field}
                />
            )}
            {field.type === 'select' && (
                <FieldSelectType
                    watch={watch}
                    control={control}
                    fieldContent={field}
                    resetField={resetField}
                />
            )}
            {field.type !== 'text' && field.type !== 'select' && (
                <span className="text-black font-medium text-sm">
                    {field.type}
                </span>
            )}
        </div>
    );
};

export default FieldTypeHandler;
