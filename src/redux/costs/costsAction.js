import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import { DELETE_ONE_COST_FAILURE, DELETE_ONE_COST_SUCCESS, EDIT_ONE_COST_FAILURE, EDIT_ONE_COST_SUCCESS, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS, FILTER_COSTS, POST_ONE_COST_FAILURE, POST_ONE_COST_SUCCESS } from "./costsType";


export const fetchCostsRequest=(payload)=>{
    return{
        type:FETCH_COSTS_REQUEST,
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

export const postCostsFailure=(payload)=>{
    return{
        type:POST_ONE_COST_FAILURE,
        payload
    }
};
const postCostsSuccess=(payload)=>{
    return{
        type:POST_ONE_COST_SUCCESS,
        payload
    }
};
export const deleteCostsFailure=(payload)=>{
    return{
        type:DELETE_ONE_COST_FAILURE,
        payload
    }
};
const deleteCostsSuccess=(payload)=>{
    return{
        type:DELETE_ONE_COST_SUCCESS,
        payload
    }
};
export const editOneCostFailure=(payload)=>{
    return{
        type:EDIT_ONE_COST_FAILURE,
        payload
    }
};
const editOneCostSuccess=(payload)=>{
    return{
        type:EDIT_ONE_COST_SUCCESS,
        payload
    }
};
export const filterCosts=(payload)=>{
    return{
        type:FILTER_COSTS,
        payload
    }
};

export const fetchCosts=()=>{
    return function(dispatch){
        dispatch(fetchCostsRequest());
        axios.get(`http://localhost:4000/expenses`)
        .then(res=>{
            dispatch(fetchCostsSuccess(res.data));
        })
        .catch(err=>{
            dispatch(fetchCostsFailure(err.message))
        })
    }
};
export const addOneCost=(payload)=>{
    console.log(payload)
    return function(dispatch){
        axios.post(`http://localhost:4000/expenses`,payload)
        .then(res=>{
            axios.get(`http://localhost:4000/expenses`)
            .then(res=>{
                dispatch(postCostsSuccess(res.data));
            })   
        })
        .catch(err=>{
            dispatch(postCostsFailure(err.message))
        })
    }
};
export const deleteOneCost=(payload)=>{
    payload.e.stopPropagation();
    return function(dispatch){
        axios.delete(`http://localhost:4000/expenses/${payload.id}`)
        .then(res=>{
            axios.get(`http://localhost:4000/expenses`)
            .then(res=>{
                dispatch(deleteCostsSuccess(res.data));
            })   
        })
        .catch(err=>{
            dispatch(deleteCostsFailure(err.message))
        })
    }
};

export const putOneCost=(payload)=>{
    console.log(payload)
    return function(dispatch){
        axios.put(`http://localhost:4000/expenses/${payload.id}`,payload.formValues)
        .then(res=>{
            axios.get(`http://localhost:4000/expenses`)
            .then(res=>{
                dispatch(editOneCostSuccess(res.data));
            })   
        })
        .catch(err=>{
            dispatch(editOneCostFailure(err.message))
        })
    }
};