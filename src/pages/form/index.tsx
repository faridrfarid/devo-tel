import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const FormHomePage: FC = () => {
    const { t } = useTranslation();
    return <div>{t('welcome')} to Form Home page </div>;
};

export default FormHomePage;
