import {createSlice} from '@reduxjs/toolkit';

interface CommonStore {
  loadingList: string[];
  isLoading: boolean;
  language: string;
}

export const commonSlice = createSlice({
  name: 'commonStore',
  initialState: {
    loadingList: [],
    isLoading: false,
    language: 'en'
  } as CommonStore,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  },

});


export const { setLoading, setLanguage} = commonSlice.actions;
export default commonSlice.reducer;
