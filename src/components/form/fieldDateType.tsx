import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
    UseFormUnregister,
} from 'react-hook-form';
import { InputInlineError } from '@components/inline-error';

interface FieldDateTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
    unregister: UseFormUnregister<FieldValues>;
}

const FieldDateType: React.FC<FieldDateTypeType> = ({
    fieldContent,
    control,
    watch,
    unregister
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
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <DatePicker
                                value={field.value}
                                className="w-full h-12"
                                onChange={field.onChange}
                            />
                            <InputInlineError error={error?.message} />
                        </>
                    )}
                />
            )}
        </>
    );
};

export default FieldDateType;
