import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import {
    Control,
    FieldValues,
    UseFormWatch,
    UseFormResetField,
    UseFormSetValue,
} from 'react-hook-form';
import FieldTextType from './fieldTextType';
import FieldSelectType from './fieldSelectType';
import FieldRadioType from './fieldRadioType';
import FieldDateType from './fieldDateType';
import FieldInputRangeType from './fieldInputRangeType';
import FieldCheckboxType from './fieldCheckboxType';

interface FieldTypeHandlerType {
    field: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    resetField: UseFormResetField<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
}

const FieldTypeHandler: React.FC<FieldTypeHandlerType> = ({
    field,
    watch,
    control,
    resetField,
    setValue,
}) => {
    return (
        <div className="w-full flex flex-col mb-1">
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
            {field.type === 'radio' && (
                <FieldRadioType
                    watch={watch}
                    control={control}
                    setValue={setValue}
                    fieldContent={field}
                />
            )}
            {field.type === 'date' && (
                <FieldDateType
                    watch={watch}
                    control={control}
                    fieldContent={field}
                />
            )}
            {field.type === 'number' && (
                <FieldInputRangeType
                    watch={watch}
                    control={control}
                    fieldContent={field}
                />
            )}
            {field.type === 'checkbox' && (
                <FieldCheckboxType
                    watch={watch}
                    control={control}
                    fieldContent={field}
                />
            )}
        </div>
    );
};

export default FieldTypeHandler;
