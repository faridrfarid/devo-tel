import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
} from 'react-hook-form';

interface FieldTextTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
}

const FieldTextType: React.FC<FieldTextTypeType> = ({
    fieldContent,
    control,
}) => {
    return (
        <>
            <Controller
                name={fieldContent.id}
                control={control}
                rules={{
                    required: fieldContent?.required
                        ? fieldContent?.required
                        : false,
                }}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <input
                            id={fieldContent.id}
                            className={`pl-4 pr-8 text-md bg-black rounded h-14 w-40 placeholder:text-xs outline-none border-none ${
                                error
                                    ? 'text-red-500 placeholder:text-red-500 bg-red-100'
                                    : 'text-black bg-white'
                            }`}
                            {...field}
                        />
                    </>
                )}
            />
        </>
    );
};

export default FieldTextType;
