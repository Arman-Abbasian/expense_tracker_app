import axios from "axios";
import { ADD_ONE_COST, DELETE_ONE_COST, EDIT_ONE_COST, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS } from "./costsType";


export const fetchCostsRequest=()=>{
    return{
        type:FETCH_COSTS_REQUEST
    }
};
export const fetchCostsFailure=(payload)=>{
    return{
        type:FETCH_COSTS_FAILURE,
        payload
    }
};
const fetchCostsSuccess=(payload)=>{
    return{
        type:FETCH_COSTS_SUCCESS,
        payload
    }
};

export const fetchCosts=()=>{
    return function(dispatch){
        dispatch(fetchCostsRequest());
        axios.get(`http://localhost:4000/expenses`)
        .then(res=>{
            console.log(res.data)
            dispatch(fetchCostsSuccess(res.data));
        })
        .catch(err=>{
            dispatch(fetchCostsFailure(err.message))
        })
    }
};

export const addOneCost=(payload)=>{
    return{
        type:ADD_ONE_COST,
        payload
    }
};
export const editOneCost=(payload)=>{
    return{
        type:EDIT_ONE_COST,
        payload
    }
};


export const deleteOneCost=(payload)=>{
    return{
        type:DELETE_ONE_COST,
        payload
    }
}