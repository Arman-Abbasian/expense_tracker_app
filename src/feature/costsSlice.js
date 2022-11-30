import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getAsyncCosts=createAsyncThunk("costs/getAsyncCosts", async (_,{rejectWithValue})=>{
  try {
    const response=await axios.get(`http://localhost:4000/expenses`);
    return response.data;
  } catch (error) {
    return rejectWithValue([],error)
  }
});
export const addAsyncCost=createAsyncThunk("costs/addAsyncCost", async (payload,{rejectWithValue})=>{
  try {
    const response=await axios.post(`http://localhost:4000/expenses`,payload);
    return response.data;
  } catch (error) {
    return rejectWithValue([],error)
  }
});
export const removeAsyncCost=createAsyncThunk("costs/removeAsyncCost", async (payload,{rejectWithValue})=>{
  try {
    await axios.delete(`http://localhost:4000/expenses/${payload}`);
    return payload;
  } catch (error) {
    return rejectWithValue([],error)
  }
});


const initialState = {
  costs:[],
  error:null,
  loading:false,
}

export const costsSlice = createSlice({
  name: 'costs',
  initialState,
  // reducers: {},
  
  extraReducers:{
  
    [getAsyncCosts.fulfilled]: (state,action) => {
      return {costs:action.payload,loading:false,error:null}
    },
    [getAsyncCosts.pending]: (state,action) => {
      return {costs:[],loading:true,error:null}
    },
    [getAsyncCosts.rejected]: (state,action) => {
      return {costs:[],loading:false,error:action.payload}
    },
    [removeAsyncCost.fulfilled]: (state,action) => {
     const remaindComment= state.comments.filter(item=>item.id!==action.payload);
     state.comments=remaindComment
    },
    [addAsyncCost.fulfilled]: (state,action) => {
      state.comments.push(action.payload)
    },
  }
})

export default costsSlice.reducer