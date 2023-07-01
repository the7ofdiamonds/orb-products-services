import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: '',
  service: []
}

export const fetchService = createAsyncThunk('service/serviceSlice', async (serviceSlug) => {
  try {
    const response = await axios.get(`/wp-json/orb/v1/services/${serviceSlug}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loading = false
        state.service = action.payload
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})


export default serviceSlice;