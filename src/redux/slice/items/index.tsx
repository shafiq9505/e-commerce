import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface itemState {
  items: any;
}
const initialState: itemState = {
  items: [],
};

const itemSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItems: (state, actions: PayloadAction<any>) => {
      state.items.push(actions.payload);
    },

    removeItems(state, actions: PayloadAction<any>) {
      state.items.splice(actions.payload, 1);
    },
  },
});

export const itemsData = (state: any) => state.cartItems;

export const { addItems, removeItems } = itemSlice.actions;

export default itemSlice.reducer;
