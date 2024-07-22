import {createSlice} from '@reduxjs/toolkit';

const initialState  = {
    userId: localStorage.getItem('userId') || null,
    name: localStorage.getItem('name') || null,
    photo: localStorage.getItem('photo') || null,
    token: localStorage.getItem('token') || null,
    phone: localStorage.getItem('phone') || null,
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.photo = action.payload.photo;
            state.token = action.payload.token;
            state.phone = action.payload.phone;
            state.isAuthenticated = true;

            // Save user data to local storage
            localStorage.setItem('userId', action.payload.userId);
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('photo', action.payload.photo);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('phone', action.payload.phone);
            localStorage.setItem('isAuthenticated', true);
        },
        removeUser: (state) => {
            state.userId = null;
            state.name = null;
            state.photo = null;
            state.token = null;
            state.phone = null;
            state.isAuthenticated = false;
        }
    }
})

export const {setUser, removeUser} = authSlice.actions;
export const authReducer = authSlice.reducer;