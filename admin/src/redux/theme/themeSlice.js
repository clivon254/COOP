

import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    themes : "light"
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{

        toggleTheme:(state) => {

            state.themes = state.themes === "light" ? "dark" : "light"

        }

    }
})


export const {toggleTheme} = themeSlice.actions


export default themeSlice.reducer 