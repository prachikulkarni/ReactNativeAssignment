import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {} from '../network/NetworkRequest';
import { SectionListItemType } from '../model/model';

// Define a type for the slice state
interface AlbumState {
  value: SectionListItemType[];
}

// Define the initial state using that type
const initialState: AlbumState = {
  value: [],
};

const AlbumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    addAlbum(state, action: PayloadAction<SectionListItemType[]>) {
      return {
        ...state,
        value: action.payload,
      };
    },
    deleteAlbumItem(state, action: PayloadAction<number>) {
      state.value = state.value.map(item => ({
        ...item,
        data: item.data.filter(album => album.id !== action.payload),
      }));
    },
  },
});

export const {addAlbum, deleteAlbumItem} = AlbumSlice.actions;

export default AlbumSlice.reducer;
