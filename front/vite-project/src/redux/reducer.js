import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user:{},
    userAppointments: []
};

export const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        setUserAppointments: (state, action) => {
            state.userAppointments = action.payload
        },
        removeUser: (state, action) => {
            state.user = {}
        },
        cancelAction: (state, action) => {
            state.userAppointments = state.userAppointments.map((appo) => {
                if (appo.id === action.payload) {
                    return {...appo, status: "Cancelled" }
                }
                return appo;
            })
        }
    }
})

export const { addUser, setUserAppointments, removeUser, cancelAction } = userSlice.actions;
