import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import {
    Control,
    Controller,
    UseFormWatch,
    FieldValues,
    UseFormSetValue,
} from 'react-hook-form';
import { Radio } from 'antd';

interface FieldRadioTypeType {
    fieldContent: FormFieldType;
    control: Control;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
}

const FieldRadioType: React.FC<FieldRadioTypeType> = ({
    fieldContent,
    control,
    watch,
    setValue,
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
                            ? fieldContent?.required
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
                        </>
                    )}
                />
            )}
        </>
    );
};

export default FieldRadioType;
