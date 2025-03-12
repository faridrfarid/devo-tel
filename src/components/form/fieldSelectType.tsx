import { FormFieldType } from '@apis/entities/insurance.entities';
import { request } from '@apis/request';
import React, { useEffect, useState } from 'react';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
    UseFormResetField,
} from 'react-hook-form';

interface FieldSelectTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    resetField: UseFormResetField<FieldValues>;
}

const FieldSelectType: React.FC<FieldSelectTypeType> = ({
    fieldContent,
    control,
    watch,
    resetField,
}) => {
    const [options, setOptions] = useState<string[]>([]);
    const ownChanges = watch(fieldContent?.id);
    const changeToLook = fieldContent?.dynamicOptions
        ? watch(fieldContent?.dynamicOptions?.dependsOn)
        : false;
    useEffect(() => {
        if (!fieldContent?.dynamicOptions) {
            setOptions(fieldContent?.options ?? []);
        }
    }, [fieldContent]);

    useEffect(() => {
        async function handleGetData(country: string) {
            try {
                const response = await request({
                    method: 'GET',
                    url: 'states',
                    params: {
                        country,
                    },
                });
                setOptions(response?.data?.states ?? []);
                resetField(fieldContent.id, {
                    defaultValue: '',
                });
            } catch (e) {
                console.log(e);
            }
        }
        if (changeToLook) {
            handleGetData(changeToLook);
        }
    }, [changeToLook]);

    return (
        <>
            <Controller
                defaultValue={''}
                name={fieldContent.id}
                control={control}
                rules={{
                    required: fieldContent?.required
                        ? fieldContent?.required
                        : false,
                }}
                render={({ field, fieldState: { error } }) => (
                    <select
                        id={fieldContent.id}
                        className={`text-sm p-2 rounded w-full outline-none ${
                            error
                                ? 'text-red-500 bg-red-100'
                                : 'text-[#121212] bg-white'
                        }`}
                        {...field}
                        onChange={field.onChange}
                    >
                        {!ownChanges && (
                            <option value="" key={-10} className="text-black">
                                {'no option selected'}
                            </option>
                        )}
                        {options &&
                            options.map((item, index) => (
                                <option
                                    value={item}
                                    key={index}
                                    className="text-black"
                                >
                                    {item}
                                </option>
                            ))}
                    </select>
                )}
            />
        </>
    );
};

export default FieldSelectType;
