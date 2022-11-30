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
  filters:{name:"",costRange:0,kind:""}
}

export const costsSlice = createSlice({
  name: 'costs',
  initialState,
  // reducers: {},
  
  extraReducers:{
  
    [getAsyncCosts.fulfilled]: (state,action) => {
      return {costs:action.payload,loading:false,error:null,filters:state.filters}
    },
    [getAsyncCosts.pending]: (state,action) => {
      return {costs:[],loading:true,error:null,filters:state.filters}
    },
    [getAsyncCosts.rejected]: (state,action) => {
      return {costs:[],loading:false,error:action.payload,filters:state.filters}
    },
    [removeAsyncCost.fulfilled]: (state,action) => {
     const remaindCosts= state.costs.filter(item=>item.id!==action.payload);
     state.costs=remaindCosts
    },
    [addAsyncCost.fulfilled]: (state,action) => {
      state.costs.push(action.payload)
    },
  }
})

export default costsSlice.reducer