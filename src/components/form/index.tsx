import { InsuranceFormResponseType } from '@apis/entities/insurance.entities';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import FieldHandler from './fieldhandler';

interface FormCreatorBaseType {
    form: InsuranceFormResponseType;
}

const FormCreatorBase: React.FC<FormCreatorBaseType> = ({ form }) => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, watch, clearErrors, setValue, resetField } =
        useForm({
            mode: 'onSubmit',
        });

    const onSubmit = async (data: any) => {
        setLoading(true);
        setLoading(false);
        clearErrors();
        console.log(data);
    };

    return (
        <div className="flex flex-col mb-4">
            <span className="text-black font-medium text-2xl">
                {form.title}
            </span>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                {form.fields.map((item) => (
                    <FieldHandler
                        key={item.id}
                        watch={watch}
                        control={control}
                        resetField={resetField}
                        setValue={setValue}
                        field={item}
                    />
                ))}

                <div className="w-full flex flex-row justify-start">
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormCreatorBase;
