import {createSlice} from '@reduxjs/toolkit';

export const infoWindowSlice = createSlice({
  name: 'infoWindow',
  initialState: {
    value: false,
  },
  reducers: {
    setVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setVisible} = infoWindowSlice.actions;

export default infoWindowSlice.reducer;
