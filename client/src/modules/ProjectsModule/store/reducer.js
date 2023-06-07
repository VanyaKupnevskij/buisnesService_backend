import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: null,
  hasSelected: false,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedAction: (state, action) => {
      state.selectedId = action.payload.id;
      state.hasSelected = true;
    },
    diselectAction: (state, action) => {
      state.selectedId = null;
      state.hasSelected = false;
    },
  },
});

export const { setSelectedAction, diselectAction } = projectSlice.actions;

export default projectSlice.reducer;
