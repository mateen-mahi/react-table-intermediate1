import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editItem:[],
    showModel: false,
    fresh : false,


}
export const showSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
          editRow(state, action) {
            if (action.payload) {
              const selectedItem = action.payload
              state.editItem = [selectedItem];
            } else {
              state.editItem = [];
            }
          },
          emptyEditItem: function(state) {
            state.editItem = [];
          },
          
          
          toggleModel: (state) => {
            state.showModel = !state.showModel;
          },

          updateApi: (state) => {
            state.fresh = !state.fresh;
          },

          }
        

        }
    
)

export const { toggleModel,editRow,emptyEditItem,updateApi} = showSlice.actions;

export default showSlice.reducer;