import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface FilterState {
    country: string,
    countryOptions: Array<string>
}

// Define the initial state using that type
const initialState: FilterState = {
    country: "All",
    countryOptions: ["All"]
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        country: (state, action) => {
            state.country = action.payload
            console.log("CHANGED")
        },
        countryOptions: (state, action) => {
            state.countryOptions = ["All"]
            action.payload.map((value: string) => state.countryOptions.push(value))
        }
    }
})

export const { country, countryOptions } = filterSlice.actions

export default filterSlice.reducer