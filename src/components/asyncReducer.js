import axios from 'axios';
import React, { StrictMode } from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import toast from 'react-hot-toast';

import { useReducerAsync } from 'use-reducer-async';

const initialState = {
  costs:[],
  loading:false,
  error:null,
  sleeping: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_SLEEP': {
      return { ...state, sleeping: true };
    }
    case 'END_SLEEP': return { ...state, sleeping: false };
    case 'GETCOSTS':{
      axios.get(`http://localhost:4000/expenses`)
      .then(res=>{
        return {...state,costs:res.data}
      })
      .catch(err=>{
      toast.error(err.message)
      return {...state,error:err.message}
    });
    console.log(state);
    };
    default: return state;
  }
};

const asyncActions = {
  SLEEP: ({ dispatch }) => async (action) => {
    dispatch({ type: 'START_SLEEP' });
    await new Promise(r => setTimeout(r, action.ms));
    dispatch({ type: 'END_SLEEP' });
  },
  GETCOSTSS:({ dispatch }) => async (action) => {
    axios.get(`http://localhost:4000/expenses`)
    .then(res=>dispatch({type:'GETCOSTS'}))
    .catch(err=>console.log(err.message))
  },
};

const Component = () => {
  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActions);
  useEffect(()=>{dispatch({type:"GETCOSTSS"})},[])
  return (
    <div>
      
    </div>
  );
};
export default Component;