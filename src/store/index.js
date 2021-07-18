import { configureStore } from '@reduxjs/toolkit';

import teamwork from "../containers/Home/teamworkReducer";

export default configureStore({
  reducer: {
    teamwork: teamwork,
  },
});
