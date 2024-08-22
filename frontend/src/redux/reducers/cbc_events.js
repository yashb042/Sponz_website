import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const cbcEventReducer = createReducer(initialState, {
    getCbcProductsRequest: (state) => {
        state.isLoading = true;
    },
    getCbcProductsSuccess: (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
    },
    getCbcProductsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

});
