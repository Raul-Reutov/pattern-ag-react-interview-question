import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface FilterState {
    country: string
}

// Define the initial state using that type
const initialState: FilterState = {
    country: "All",
}

export const filterSlice = createSlice({
    name: 'filter',
    // `filterSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        country: (state, action) => {
            state.country = action.payload
        }
    }
})

export const { country } = filterSlice.actions

export default filterSlice.reducer