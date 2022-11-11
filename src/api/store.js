import {configureStore} from '@reduxjs/toolkit';
import productsSlice from './ShopSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});

export default store;
