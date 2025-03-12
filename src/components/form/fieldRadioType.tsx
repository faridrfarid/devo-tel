import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import {
    Control,
    Controller,
    UseFormWatch,
    FieldValues,
} from 'react-hook-form';

interface FieldRadioTypeType {
    fieldContent: FormFieldType;
    control: Control;
    watch: UseFormWatch<FieldValues>;
}

const FieldRadioType: React.FC<FieldRadioTypeType> = ({
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
                    defaultValue={''}
                    name={fieldContent.id}
                    control={control}
                    rules={{
                        required: fieldContent?.required
                            ? fieldContent?.required
                            : false,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <div className="flex flex-row items-center">
                            {fieldContent.options?.map((item) => (
                                <div className="flex flex-row items-center mr-2">
                                    <input
                                        {...field}
                                        type="radio"
                                        id={fieldContent.id}
                                        value={item}
                                    />
                                    <span className="ml-2 uppercase">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                />
            )}
        </>
    );
};

export default FieldRadioType;
