import { configureStore } from '@reduxjs/toolkit';
import formSlice from '../slices/formSlice';
import searchSlice from '../slices/searchSlice';
import listSlice from '../slices/listSlice';

const reducer = {
  form: formSlice,
  search: searchSlice,
  list: listSlice,
};

const store = configureStore({
  reducer,
  devtools: true,
});

export default store;
