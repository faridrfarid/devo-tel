import { InsuranceFormResponseType } from '@apis/entities/insurance.entities';
import { request } from '@apis/request';
import FormCreatorBase from '@components/form';
import { FC, useEffect, useState } from 'react';

const FormHomePage: FC = () => {
    const [forms, setForms] = useState<InsuranceFormResponseType[]>([]);
    async function handleGetData() {
        try {
            const response = await request({
                method: 'GET',
                url: 'insuranceForms',
            });
            setForms(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <div>
            <div>
                {forms.map((item) => (
                    <FormCreatorBase key={item.formId} form={item} />
                ))}
            </div>
        </div>
    );
};

export default FormHomePage;
