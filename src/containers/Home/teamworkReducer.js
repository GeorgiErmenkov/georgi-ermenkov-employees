import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const teamworkAdapter = createEntityAdapter();

export const teamworkSlice = createSlice({
  name: 'teamwork',
  initialState: teamworkAdapter.getInitialState(),
  reducers: {
    setTeamworks: teamworkAdapter.setAll,
  },
});

export const { setTeamworks } = teamworkSlice.actions;

export const {
  selectAll,
} = teamworkAdapter.getSelectors((state) => state.teamwork);

export default teamworkSlice.reducer;

