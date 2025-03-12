import { FormFieldType } from '@apis/entities/insurance.entities';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface FieldRadioTypeType {
    fieldContent: FormFieldType;
    control: Control;
}

const FieldRadioType: React.FC<FieldRadioTypeType> = ({
    fieldContent,
    control,
}) => {
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
                    <div className="flex flex-row items-center">
                        {fieldContent.options?.map((item) => (
                            <div className="flex flex-row items-center mr-2">
                                <input
                                    {...field}
                                    type="radio"
                                    id={fieldContent.id}
                                    value={item}
                                />
                                <span className="ml-2 uppercase">{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            />
        </>
    );
};

export default FieldRadioType;
