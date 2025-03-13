import './index.css';
import './i18n';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import store from '@redux/index';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ThemeProvider } from '@components/theme';

const App = () => {
    const { i18n } = useTranslation();

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <ThemeProvider>
                    <AppRoutes />
                </ThemeProvider>
            </Provider>
        </I18nextProvider>
    );
};

export default App;
