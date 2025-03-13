import { InsuranceFormResponseType } from '@apis/entities/insurance.entities';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, notification } from 'antd';
import FieldHandler from './fieldhandler';
import { request } from '@apis/request';

const key = 'updatable';

interface FormCreatorBaseType {
    form: InsuranceFormResponseType;
}

const FormCreatorBase: React.FC<FormCreatorBaseType> = ({ form }) => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        control,
        watch,
        clearErrors,
        setValue,
        resetField,
        reset,
        unregister,
    } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        clearErrors();
        try {
            const response = await request({
                method: 'POST',
                url: 'insuranceFormsSubmit',
                data,
            });
            if (response) {
                reset();
                api.open({
                    key,
                    message: 'Submission',
                    description: 'Form Successfully Submitted.',
                });
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="flex flex-col mb-4">
                <span className="text-black font-bold text-lg sm:text-2xl mx-auto w-full md:w-[650px] mb-4">
                    {form.title}
                </span>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col bg-white border-0.5 shadow-2xl mb-8 mx-auto w-full md:w-[650px] rounded-lg p-6"
                >
                    {form.fields.map((item) => (
                        <FieldHandler
                            key={item.id}
                            watch={watch}
                            control={control}
                            resetField={resetField}
                            setValue={setValue}
                            unregister={unregister}
                            field={item}
                        />
                    ))}

                    <div className="w-full h-12 mt-4">
                        <Button
                            className="w-full h-full"
                            style={{ height: '100%' }}
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormCreatorBase;
