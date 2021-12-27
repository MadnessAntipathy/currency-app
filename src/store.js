import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './modules/currencytable/currencyslice'

export default configureStore({
  reducer: {
    currency:currencyReducer
  }
})
