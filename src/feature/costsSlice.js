import { createSlice,createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterValue } from '../utils/filterValue';


export const getAsyncCosts=createAsyncThunk("costs/getAsyncCosts", async (payload,{rejectWithValue})=>{
  try {
    const response=await axios.get(`http://localhost:4000/expenses`);
    return {data:response.data,filters:payload};
  } catch (error) {
    return rejectWithValue([],error)
  }
});

export const addAsyncCost=createAsyncThunk("costs/addAsyncCost", async (payload,{rejectWithValue})=>{
  try {
    const response=await axios.post(`http://localhost:4000/expenses`,payload);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return rejectWithValue([],error)
  }
});
export const removeAsyncCost=createAsyncThunk("costs/removeAsyncCost", async (payload,{rejectWithValue})=>{
  try {
    await axios.delete(`http://localhost:4000/expenses/${payload}`);
    console.log(payload)
    return payload;
  } catch (error) {
    return rejectWithValue([],error)
  }
});
export const changeAsyncCost=createAsyncThunk("costs/changeAsyncCost", async (payload,{rejectWithValue})=>{
  try {
    const response=await axios.put(`http://localhost:4000/expenses/${payload.id}`,payload.formValues);
    return {newData:response.data,id:payload.id};
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
      console.log(action.payload)
      const filteredCosts= filterValue(action.payload.data,action.payload.filters)
      return {costs:filteredCosts,loading:false,error:null,filters:action.payload.filters}
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
      state.costs.push(action.payload);
    },
    [changeAsyncCost.fulfilled]: (state,action) => {
      const index=state.costs.findIndex(item=>item.id===action.payload.id);
      state.costs.splice(index,1,action.payload.newData);
    },
  }
});
export default costsSlice.reducer;