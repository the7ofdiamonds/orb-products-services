import { configureStore } from '@reduxjs/toolkit'
import { serviceSlice } from '../controllers/serviceSlice.js'
import { scheduleSlice } from '../controllers/scheduleSlice.js'
import { invoiceSlice } from '../controllers/invoiceSlice.js'
import { paymentSlice } from '../controllers/paymentSlice.js'
import { receiptSlice } from '../controllers/receiptSlice.js'

const store = configureStore({
    reducer: {
        service: serviceSlice.reducer,
        schedule: scheduleSlice.reducer,
        invoice: invoiceSlice.reducer,
        payment: paymentSlice.reducer,
        receipt: receiptSlice.reducer
    }
})

export default store