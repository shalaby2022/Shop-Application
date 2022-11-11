import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SafeAreaView} from 'react-native-safe-area-context';

const base_URL = `https://api.escuelajs.co/api/v1/products?fbclid=IwAR2aGlNvcXsy1jppV7T2wzZ1KGKhbflbrEvu_t_OOmQVpkTVAPKpmLBJiXs`;

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
  return fetch(base_URL)
    .then(response => response.json())
    .then(res => {
      let products = res.map(item => {
        return {...item, count: 1, totalPrice: item.price};
      });
      return products;
    })
    .catch(err => err);
});

const initialState = {
  products: [],
  error: '',
  isLoading: false,
  favs: [],
  total: [],
  final: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      let fav = state.favs;
      let index = fav.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.favs.push(action.payload);
      } else {
        state.favs[index].count++;
        let price = state.favs[index].price;
        state.favs[index].totalPrice = price * state.favs[index].count;
      }
      state.total = state.favs.map(item => item.totalPrice);
      state.final = state.total.reduce((current, next) => current + next, 0);
    },
    removeFavorite: (state, action) => {
      state.favs = state.favs.filter(item => item.id !== action.payload.id);
      state.total = state.favs.map(item => item.totalPrice);
      state.final = state.total.reduce((current, next) => current + next, 0);
    },
    incCounter: (state, action) => {
      let index = state.favs.findIndex(item => item.id === action.payload.id);
      let price = state.favs[index].price;
      state.favs[index].count++;
      state.favs[index].totalPrice = price * state.favs[index].count;
      state.total = state.favs.map(item => item.totalPrice);
      state.final = state.total.reduce((current, next) => current + next, 0);
    },
    decCounter: (state, action) => {
      let index = state.favs.findIndex(item => item.id === action.payload.id);
      let price = state.favs[index].price;
      if (state.favs[index].count > 1) {
        state.favs[index].count--;
        state.favs[index].totalPrice = price * state.favs[index].count;
      } else {
        state.favs = state.favs.filter(item => item.id !== action.payload.id);
      }
      state.total = state.favs.map(item => item.totalPrice);
      state.final = state.total.reduce((current, next) => current + next, 0);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const {addFavorite, removeFavorite, incCounter, decCounter} =
  productsSlice.actions;
export default productsSlice.reducer;
