import { FormFieldType } from '@apis/entities/insurance.entities';
import { request } from '@apis/request';
import React, { useEffect, useState } from 'react';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
    UseFormResetField,
    UseFormUnregister,
} from 'react-hook-form';
import { Select } from 'antd';
import { InputInlineError } from '@components/inline-error';

const { Option } = Select;

interface FieldSelectTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    resetField: UseFormResetField<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
}

const FieldSelectType: React.FC<FieldSelectTypeType> = ({
    fieldContent,
    control,
    watch,
    resetField,
    unregister,
}) => {
    const [visible, setVisible] = useState(true);
    const [options, setOptions] = useState<string[]>([]);
    const changeToLook = fieldContent?.dynamicOptions
        ? watch(fieldContent?.dynamicOptions?.dependsOn)
        : false;
    const visibleWatcher = fieldContent?.visibility
        ? watch(fieldContent?.visibility?.dependsOn)
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

    useEffect(() => {
        if (visibleWatcher) {
            if (fieldContent?.visibility?.condition === 'equals') {
                if (visibleWatcher !== fieldContent?.visibility?.value) {
                    setVisible(false);
                    unregister(fieldContent.id);
                } else {
                    setVisible(true);
                }
            } else {
                setVisible(true);
            }
        } else {
            setVisible(true);
        }
    }, [visibleWatcher]);

    return (
        <>
            {visible && (
                <span className="text-black font-medium text-md my-2">
                    {fieldContent.label}
                </span>
            )}
            {visible && (
                <Controller
                    defaultValue={''}
                    name={fieldContent.id}
                    control={control}
                    rules={{
                        required: fieldContent?.required
                            ? fieldContent?.required
                                ? `Please Select One Option of ${fieldContent?.label}`
                                : false
                            : false,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Select
                                placeholder="Select an option"
                                style={{ height: 48 }}
                                className="w-full"
                                onChange={field.onChange}
                                value={field.value}
                            >
                                {options &&
                                    options.map((item, index) => (
                                        <Option key={index} value={item}>
                                            {item}
                                        </Option>
                                    ))}
                            </Select>
                            <InputInlineError error={error?.message} />
                        </>
                    )}
                />
            )}
        </>
    );
};

export default FieldSelectType;
