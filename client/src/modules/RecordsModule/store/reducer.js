import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const someSlice = createSlice({
  name: 'some',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default someSlice.reducer;
