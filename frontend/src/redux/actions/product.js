import axios from "axios";
import {server} from "../../server";

// create product
export const createProduct =
    (
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images
    ) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: "productCreateRequest",
                });

                const {data} = await axios.post(
                    `${server}/product/create-product`,
                    {
                        name,
                        description,
                        category,
                        tags,
                        originalPrice,
                        discountPrice,
                        stock,
                        shopId,
                        images,
                    },
                    {
                        headers: {
                            "ngrok-skip-browser-warning": true,
                        },
                    }
                );
                dispatch({
                    type: "productCreateSuccess",
                    payload: data.product,
                });
            } catch (error) {
                dispatch({
                    type: "productCreateFail",
                    payload: error.response.data.message,
                });
            }
        };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest",
        });

        const {data} = await axios.get(
            `${server}/product/get-all-products-shop/${id}`,
            {
                headers: {
                    "ngrok-skip-browser-warning": true,
                },
            }
        );
        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message,
        });
    }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest",
        });

        const {data} = await axios.delete(
            `${server}/product/delete-shop-product/${id}`,
            {
                withCredentials: true,
                headers: {
                    "ngrok-skip-browser-warning": true,
                },
            }
        );

        dispatch({
            type: "deleteProductSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteProductFailed",
            payload: error.response.data.message,
        });
    }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest",
        });

        const {data} = await axios.get(`${server}/product/get-all-products`, {
            headers: {
                "ngrok-skip-browser-warning": true,
            },
        });
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.knowafestevents,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response.data.message,
        });
    }
};


// get all products filtered
export const getAllProductsFiltered = (organizer) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsFilteredRequest",
        });

        const {data} = await axios.get(`${server}/product/get-all-products-filters/${organizer}`, {
            headers: {
                "ngrok-skip-browser-warning": true,
            },
        });
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.knowafestevents,
        });
        return data.knowafestevents;
    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response.data.message,
        });
        throw error;
    }
};
