import {configureStore} from '@reduxjs/toolkit';
import albumReducer from './Album';

const Store = configureStore({
  reducer: {
    sectionList: albumReducer,
  },
});

export default Store;
