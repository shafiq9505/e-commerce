import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import itemReducer from "./slice/items";

const persistConfig = {
  key: "root",
  storage,
};

const persistedItemReducer = persistReducer(persistConfig, itemReducer);

export const store = configureStore({
  reducer: {
    cartItems: persistedItemReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistorItems = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

