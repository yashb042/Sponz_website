import axios from "axios";
import {server} from "../../server";

export const getCbcEvents = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: "getCbcProductsRequest",
        });

        const {data} = await axios.post(`${server}/cbc/get-cbc-events`, {payload}, {
            headers: {
                "ngrok-skip-browser-warning": true,
            },
        });
        dispatch({
            type: "getCbcProductsSuccess",
            payload: data.cbcEvents,
        });
        return data.cbcEvents;
    } catch (error) {
        dispatch({
            type: "getCbcProductsFailed",
            payload: error.response.data.message,
        });
        throw error;
    }
};
