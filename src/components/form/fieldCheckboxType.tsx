import { FormFieldType } from '@apis/entities/insurance.entities';
import React, { useEffect, useState } from 'react';
import {
    Control,
    FieldValues,
    Controller,
    UseFormWatch,
} from 'react-hook-form';
import { Checkbox } from 'antd';
import { InputInlineError } from '@components/inline-error';

interface FieldCheckboxTypeType {
    fieldContent: FormFieldType;
    watch: UseFormWatch<FieldValues>;
    control: Control;
}

const FieldCheckboxType: React.FC<FieldCheckboxTypeType> = ({
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
                                ? `Please Select At Least One of ${fieldContent.label} Options`
                                : false
                            : false,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <div className="w-full my-2">
                                <Checkbox.Group
                                    onChange={field.onChange}
                                    value={field.value}
                                >
                                    {fieldContent.options?.map(
                                        (item, index) => (
                                            <Checkbox key={index} value={item}>
                                                <span className="text-sm">
                                                    {item}
                                                </span>
                                            </Checkbox>
                                        )
                                    )}
                                </Checkbox.Group>
                            </div>
                            <InputInlineError error={error?.message} />
                        </>
                    )}
                />
            )}
        </>
    );
};

export default FieldCheckboxType;
