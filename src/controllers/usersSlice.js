import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userLoading: false,
    userError: '',
    user_login: '',
    user_pass: '',
    user_email: '',
    first_name: '',
    last_name: '',
    user_id: ''
};

export const getUser = createAsyncThunk('user/getUser', async (_, { getState }) => {
    const { user_email } = getState().user;
    const encodedEmail = encodeURIComponent(user_email);

    try {
        const response = await fetch(`/wp-json/seven-tech/v1/users/${encodedEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.userLoading = true
                state.userError = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userError = null;
                state.user_id = action.payload.id
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userLoading = false
                state.userError = action.error.message
            })
    }
})

export default usersSlice;