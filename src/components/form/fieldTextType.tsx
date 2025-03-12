import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
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
                <span className="text-black font-medium text-md mb-1">
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
            )}
        </>
    );
};

export default FieldTextType;
