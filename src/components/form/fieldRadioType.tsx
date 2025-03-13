import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import {
    Control,
    Controller,
    UseFormWatch,
    FieldValues,
    UseFormSetValue,
    UseFormUnregister,
} from 'react-hook-form';
import { Radio } from 'antd';
import { InputInlineError } from '@components/inline-error';

interface FieldRadioTypeType {
    fieldContent: FormFieldType;
    control: Control;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
}

const FieldRadioType: React.FC<FieldRadioTypeType> = ({
    fieldContent,
    control,
    watch,
    setValue,
    unregister,
}) => {
    const [visible, setVisible] = useState(true);
    const visibleWatcher = fieldContent?.visibility
        ? watch(fieldContent?.visibility?.dependsOn)
        : false;
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

    useEffect(() => {
        setValue(
            fieldContent.id,
            fieldContent.options ? fieldContent.options[0] : ''
        );
    }, [fieldContent]);

    return (
        <>
            {visible && (
                <span className="text-black font-medium text-base my-2">
                    {fieldContent.label}
                </span>
            )}
            {visible && (
                <Controller
                    name={fieldContent.id}
                    control={control}
                    rules={{
                        required: fieldContent?.required
                            ? `Please Select One Option of ${fieldContent?.label}`
                            : false,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <div className="flex flex-row items-center mb-2">
                                {fieldContent.options?.map((item) => (
                                    <Radio
                                        value={item}
                                        checked={field.value === item}
                                        onChange={field.onChange}
                                    >
                                        <span className="text-sm uppercase">
                                            {item}
                                        </span>
                                    </Radio>
                                ))}
                            </div>
                            <InputInlineError error={error?.message} />
                        </>
                    )}
                />
            )}
        </>
    );
};

export default FieldRadioType;
