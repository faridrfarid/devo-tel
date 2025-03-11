import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserType } from '../types';

interface AppSliceType {
    state: 'ideal' | 'no-connection';
    user: IUserType | null;
}

const initialState: AppSliceType = {
    state: 'ideal',
    user: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppState: (state, action: PayloadAction<AppSliceType['state']>) => {
            state.state = action.payload;
        },
    },
});

export const { setAppState } = appSlice.actions;

export default appSlice.reducer;
