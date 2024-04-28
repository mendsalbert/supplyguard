// store.ts
import categoryReducer from "@/features/category/categorySlice";
import userReducer from "@/features/user/userSlice";
import productReducer from "@/features/product/productSlice";
import roleReducer from "@/features/role/roleSlice";
import orderReducer from "@/features/order/orderSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    users: userReducer,
    products: productReducer,
    roles: roleReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
