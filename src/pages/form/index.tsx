import { request } from '@apis/request';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FormHomePage: FC = () => {
    const { t } = useTranslation();
    async function handleGetData() {
        try {
            const response = await request({
                method: 'GET',
                url: 'insuranceForms',
            });
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleGetData();
    }, []);
    return <div>{t('welcome')} to Form Home page </div>;
};

export default FormHomePage;
