import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        name: "",
        username: "",
        role: "",//owner, admin,
        refresh: false
    },
    reducers: {
        updateUser: (state, { payload }) => {
            return { ...state, ...payload };
        },
        clearUser: (state) => {
            state.username = "";
            state.name = "";
            state.role = "";
        },
        runRefresh: (state) => {
            state.refresh = !state.refresh
        }
    }
});

export const { updateUser, clearUser, runRefresh } = user.actions;
export default user.reducer;