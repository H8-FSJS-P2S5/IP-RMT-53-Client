import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    privates: [],
  };

  export const PrivateSlice = createSlice({
    name: 'private',
    initialState,
    reducers: {
      setPrivate: (state, action) => {
        state.privates = action.payload;
      },
      clearPrivate: (state) => {
        state.privates = [];
      },
    },
  });

 export const {setPrivate, clearPrivate} = PrivateSlice.actions
 export default PrivateSlice.reducer

