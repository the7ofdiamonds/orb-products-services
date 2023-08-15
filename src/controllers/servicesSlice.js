import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  servicesloading: false,
  servicesError: '',
  services: [],
  availableServices: []
}

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {

  try {
    const response = await fetch(`/wp-json/orb/v1/services`, {
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
    throw error.message;
  }
});

export const getAvailableServices = createAsyncThunk('services/getAvailableServices', async () => {

  try {
    const response = await fetch(`/wp-json/orb/v1/services/available`, {
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
    throw error.message;
  }
});

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.servicesError = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false
        state.services = action.payload
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.servicesError = action.error.message
      })
      .addCase(getAvailableServices.pending, (state) => {
        state.loading = true
        state.servicesError = null
      })
      .addCase(getAvailableServices.fulfilled, (state, action) => {
        state.loading = false
        state.availableServices = action.payload
      })
      .addCase(getAvailableServices.rejected, (state, action) => {
        state.loading = false
        state.servicesError = action.error.message
      })
  }
})


export default servicesSlice;