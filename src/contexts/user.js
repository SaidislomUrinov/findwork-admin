import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {
        name: "",
        username: "",
        role: ""//owner, admin
    },
    reducers: {
        updateUser: (state, { payload }) => {
            return { ...state, ...payload };
        },
        clearUser: (state) => {
            state.username = "";
            state.name = "";
            state.role = "";
        }
    }
});

export const { updateUser, clearUser } = user.actions;
export default user.reducer;