import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
} from 'react-hook-form';
import { Input } from 'antd';
import { InputInlineError } from '@components/inline-error';

interface FieldTextTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
}

const FieldTextType: React.FC<FieldTextTypeType> = ({
    fieldContent,
    control,
    watch,
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

    return (
        <>
            {visible && (
                <span className="text-black font-medium text-md my-2">
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
                                ? `Please Enter ${fieldContent?.label}`
                                : false
                            : false,
                        pattern: {
                            value: fieldContent?.validation?.pattern
                                ? new RegExp(fieldContent?.validation?.pattern)
                                : '/^.*$/',
                            message: `Please enter a valid ${fieldContent?.label}`,
                        },
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Input
                                placeholder={`Enter ${fieldContent.label} here`}
                                className="w-full h-12"
                                onChange={field.onChange}
                                value={field.value}
                            />
                            <InputInlineError error={error?.message} />
                        </>
                    )}
                />
            )}
        </>
    );
};

export default FieldTextType;
