import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import {
    Control,
    FieldValues,
    UseFormWatch,
    UseFormResetField,
    UseFormSetValue,
    UseFormUnregister,
} from 'react-hook-form';
import FieldTypeHandler from './fieldTypehandler';

interface FieldHandlerType {
    field: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    resetField: UseFormResetField<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
}

const FieldHandler: React.FC<FieldHandlerType> = ({
    field,
    control,
    watch,
    resetField,
    setValue,
    unregister
}) => {
    return (
        <div className="w-full flex flex-col">
            {field.type === 'group' && (
                <span className="text-black font-bold text-base sm:text-lg my-4">
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
                        unregister={unregister}
                        field={item}
                    />
                ))
            ) : (
                <FieldTypeHandler
                    control={control}
                    watch={watch}
                    resetField={resetField}
                    setValue={setValue}
                    unregister={unregister}
                    field={field}
                />
            )}
        </div>
    );
};

export default FieldHandler;
