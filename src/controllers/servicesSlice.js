import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: '',
  services: {}
}

export const fetchServices = createAsyncThunk('services/servicesSlice', async () => {
  try {
    const response = await axios.get(`/wp-json/orb/v1/services`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false
        state.services = action.payload
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})


export default servicesSlice;