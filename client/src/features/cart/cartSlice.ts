import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../model/ICart";
import request from "../../api/requests";

interface CartState {
    cart: Cart | null;
    status?: string;
}

const initialState: CartState = {
    cart: null,
    status: "idle"
};

export const addItemToCart = createAsyncThunk<Cart, { productId: number, quantity?: number }>(
    "cart/addItemToCart",
    async ({productId, quantity=1})=> {
        try {
            return await request.Cart.addItem(productId, quantity);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const deleteItemFromCart = createAsyncThunk<Cart,
 { productId: number, quantity?: number, key?: string }>(
    "cart/deleteItemFromCart",
    async ({productId, quantity=1})=> {
        try {
            return await request.Cart.deleteItem(productId, quantity);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.pending, (state, action) => {
                console.log(action);
                state.status = "pendingAddItem" + action.meta.arg.productId;
            });

        builder
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.status = "idle";
            });
        
        builder
            .addCase(addItemToCart.rejected, (state, action) => {
                console.log(action);
                state.status = "idle";
            });

        //deleteItem
        builder
            .addCase(deleteItemFromCart.pending, (state, action) => {
                console.log(action);
                state.status = "pendingDeleteItem"+ action.meta.arg.productId + action.meta.arg.key;
            });

        builder
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.status = "idle";
            });

        builder
            .addCase(deleteItemFromCart.rejected, (state, action) => {
                console.log(action);
                state.status = "idle";
            });

    }
});


export const { setCart } = cartSlice.actions;