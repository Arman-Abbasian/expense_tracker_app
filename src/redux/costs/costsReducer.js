import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import { ADD_ONE_COST, DELETE_ONE_COST, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS } from "./costsType";


const initialState={
    costs:[],
    error:"",
    laoding:false
}
export const costsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_COSTS_REQUEST:{
            return {costs:[],error:"",laoding:true}
        };
        case FETCH_COSTS_SUCCESS:{
            console.log(action.payload)
            return {costs:action.payload,error:"",laoding:false}
        };
        case FETCH_COSTS_FAILURE:{
            return {costs:[],error:action.payload,laoding:false}
        }

        case ADD_ONE_COST:{
            axios.post(`http://localhost:4000/expenses`,action.payload)
            .then(res=>{
                return {...state};
            })
            .catch(err=>console.log(err.message))
           return {...state};
        };

        case DELETE_ONE_COST:{
            console.log(action.payload)
            action.payload.e.stopPropagation();
            axios.delete(`http://localhost:4000/expenses/${action.payload.id}`)
            .then(res=>{
                return {...state};
            })
            .catch(err=>console.log(err));
            return {...state};
        }
        case FILTER_COSTS:{
            filterValue(state.costs,action.payload)
            console.log(action.payload)
            action.payload.e.stopPropagation();
            axios.delete(`http://localhost:4000/expenses/${action.payload.id}`)
            .then(res=>{
                return {...state};
            })
            .catch(err=>console.log(err));
            return {...state};
        }
            
        default:
            return state;
    }
}
export default costsReducer;
