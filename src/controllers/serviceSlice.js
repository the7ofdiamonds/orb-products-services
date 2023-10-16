import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  serviceLoading: false,
  serviceError: '',
  service: []
}


export const fetchService = createAsyncThunk('service/serviceSlice', async (serviceSlug) => {
  try {
    const response = await axios.get(`/wp-json/orb/v1/service/${serviceSlug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.serviceLoading = true
        state.serviceError = ''
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.serviceLoading = false
        state.serviceError = null
        state.service = action.payload
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.serviceLoading = false
        state.serviceError = action.error.message
      })
  }
})


export default serviceSlice;