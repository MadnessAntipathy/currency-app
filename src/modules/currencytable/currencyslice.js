import { createSlice } from '@reduxjs/toolkit'

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    value: ''
  },
  reducers: {
    setCurrencyInStore: (state, action) => {
      state.value = action.payload
    },
    someOtherAction: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setCurrencyInStore } = currencySlice.actions

export default currencySlice.reducer
