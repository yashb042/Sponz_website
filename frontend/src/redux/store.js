import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";
import {sellerReducer} from "./reducers/seller";
import {productReducer} from "./reducers/product";
import {eventReducer} from "./reducers/event";
import {cartReducer} from "./reducers/cart";
import {wishlistReducer} from "./reducers/wishlist";
import {orderReducer} from "./reducers/order";
import {cbcEventReducer} from "./reducers/cbc_events";


const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        cbc_events: cbcEventReducer,
        events: eventReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer,
    },
});

export default Store;
