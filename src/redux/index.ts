import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import languageSlice from './slices/languageSlice';

const store = configureStore({
    reducer: {
        app: appSlice,
        language: languageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
