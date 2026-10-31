import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../features/rooms/roomsSlice';
import addonsReducer from '../features/addons/addonsSlice';
import mealsReducer from '../features/meals/mealsSlice';
import estimatesReducer from '../features/estimates/estimatesSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    addons: addonsReducer,
    meals: mealsReducer,
    estimates: estimatesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

