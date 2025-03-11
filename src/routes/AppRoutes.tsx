import { useAppSelector } from '@hooks/redux';
import { ROUTES } from '@configs/routes';
import FormHomePage from '@pages/form';
import ListHomePage from '@pages/list';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContainer from 'components/layout';

const AppRouter: React.FC = () => {
    const { i18n } = useTranslation();
    const language = useAppSelector((state) => state.language);

    useEffect(() => {
        i18n.changeLanguage(language.code);
    }, [language, i18n]);

    return (
        <Router>
            <Routes>
                <Route path={ROUTES.HOME} element={<MainContainer />}>
                    <Route index element={<ListHomePage />} />
                    <Route path={ROUTES.FORM} element={<FormHomePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
