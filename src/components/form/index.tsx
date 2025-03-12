import { InsuranceFormResponseType } from '@apis/entities/insurance.entities';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FieldHandler from './fieldhandler';
import { useTranslation } from 'react-i18next';

interface FormCreatorBaseType {
    form: InsuranceFormResponseType;
}

const FormCreatorBase: React.FC<FormCreatorBaseType> = ({ form }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, watch, clearErrors } = useForm({
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
                        field={item}
                    />
                ))}

                <div className="w-full flex flex-row justify-start">
                    <button
                        type="submit"
                        className="text-white block bg-blue-500 rounded-lg text-base font-medium text-center w-44 h-14 mt-6"
                    >
                        {loading ? (
                            <span
                                className={`w-full h-full flex items-center justify-center relative ${
                                    loading ? 'block' : 'hidden'
                                }`}
                            >
                                <span className="dot-flashing mx-auto"></span>
                            </span>
                        ) : (
                            t('submit')
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormCreatorBase;
