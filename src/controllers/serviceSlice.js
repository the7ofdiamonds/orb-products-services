import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  serviceLoading: false,
  serviceError: '',
  service_id: '',
  title: '',
  price: '',
  description: '',
  content: '',
  features: '',
  onboarding_link: '',
  icon: '',
  action_word: '',
  slug: ''
}


export const fetchService = createAsyncThunk('service/serviceSlice', async (serviceSlug) => {
  try {
    const response = await axios.get(`/wp-json/orb/service/v1/${serviceSlug}`);
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
        state.serviceError = null
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.serviceLoading = false
        state.serviceError = ''
        state.service_id = action.payload.service_id
        state.title = action.payload.title
        state.price = action.payload.price
        state.description = action.payload.description
        state.content = action.payload.content
        state.features = action.payload.features
        state.onboarding_link = action.payload.onboarding_link
        state.icon = action.payload.icon
        state.action_word = action.payload.action_word
        state.slug = action.payload.slug
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.serviceLoading = false
        state.serviceError = action.error.message
      })
  }
})


export default serviceSlice;