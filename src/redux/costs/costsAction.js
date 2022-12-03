import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import { ADD_ONE_COST, DELETE_ONE_COST, EDIT_ONE_COST, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS, Filter, FILTER_COSTS, POST_COSTS_SUCCESS } from "./costsType";


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
        type:FETCH_COSTS_FAILURE,
        payload
    }
};
const postCostsSuccess=(payload)=>{
    return{
        type:POST_COSTS_SUCCESS,
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

// export const addOneCost=(payload)=>{
//     return{
//         type:ADD_ONE_COST,
//         payload
//     }
// };
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
export const filterCosts=(payload)=>{
    return{
        type:FILTER_COSTS,
        payload
    }
};