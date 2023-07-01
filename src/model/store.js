import { configureStore } from '@reduxjs/toolkit'
import { servicesSlice } from '../controllers/servicesSlice.js'
import { serviceSlice } from '../controllers/serviceSlice.js'
import { quoteSlice } from '../controllers/quoteSlice.js'
import { clientSlice } from '../controllers/clientSlice.js'
import { usersSlice } from '../controllers/usersSlice.js'
import { invoiceSlice } from '../controllers/invoiceSlice.js'
import { scheduleSlice } from '../controllers/scheduleSlice.js'
import { paymentSlice } from '../controllers/paymentSlice.js'
import { receiptSlice } from '../controllers/receiptSlice.js'

const store = configureStore({
    reducer: {
        services: servicesSlice.reducer,
        service: serviceSlice.reducer,
        quote: quoteSlice.reducer,
        users: usersSlice.reducer,
        client: clientSlice.reducer,
        invoice: invoiceSlice.reducer,
        schedule: scheduleSlice.reducer,
        payment: paymentSlice.reducer,
        receipt: receiptSlice.reducer
    }
})

export default store