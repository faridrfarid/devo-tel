import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
} from 'react-hook-form';

interface FieldInputRangeTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
}

const FieldInputRangeType: React.FC<FieldInputRangeTypeType> = ({
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
                        <Slider
                            min={fieldContent?.validation?.min ?? 0}
                            max={fieldContent?.validation?.max ?? 100}
                            step={1}
                            tooltip={{ open: true }}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            )}
        </>
    );
};

export default FieldInputRangeType;
