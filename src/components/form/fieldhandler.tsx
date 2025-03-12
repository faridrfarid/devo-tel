import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import {
    Control,
    FieldValues,
    UseFormWatch,
    UseFormResetField,
    UseFormSetValue,
} from 'react-hook-form';
import FieldTypeHandler from './fieldTypehandler';

interface FieldHandlerType {
    field: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    resetField: UseFormResetField<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
}

const FieldHandler: React.FC<FieldHandlerType> = ({
    field,
    control,
    watch,
    resetField,
    setValue,
}) => {
    return (
        <div className="w-full flex flex-col">
            {field.type === 'group' && (
                <span className="text-black font-bold text-lg mb-1">
                    {field.label}
                </span>
            )}
            {field.type === 'group' ? (
                field?.fields?.map((item) => (
                    <FieldTypeHandler
                        control={control}
                        watch={watch}
                        resetField={resetField}
                        setValue={setValue}
                        field={item}
                    />
                ))
            ) : (
                <FieldTypeHandler
                    control={control}
                    watch={watch}
                    resetField={resetField}
                    setValue={setValue}
                    field={field}
                />
            )}
        </div>
    );
};

export default FieldHandler;
