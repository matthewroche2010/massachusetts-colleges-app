import {createSlice} from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'page',
  initialState: {
    value: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setPage} = tableSlice.actions;

export default tableSlice.reducer;
