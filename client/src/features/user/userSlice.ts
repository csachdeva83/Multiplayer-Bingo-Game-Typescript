import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    name: string,
    email: string,
    photo: string
}

const initialState = {
    name: '',
    email: '',
    photo: ''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoginDetails: (state,action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },
        setSignOutState: state => {
            state.name = '';
            state.email = '';
            state.photo = '';
        }
    }
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
export default userSlice.reducer;