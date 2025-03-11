// import { i18n } from '@/i18n';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    code: string;
    label: string;
    icon: string;
}

const initialState: LanguageState = {
    code: 'en',
    label: 'English',
    icon: '/EnglishFlag.png',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<LanguageState>) => {
            state.code = action.payload.code;
            state.label = action.payload.label;
            state.icon = action.payload.icon;
            // i18n.changeLanguage(action.payload.code);
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
