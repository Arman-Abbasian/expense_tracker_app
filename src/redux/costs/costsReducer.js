import axios from "axios";
import { DELETE_ONE_COST, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS } from "./costsType";
import { fetchCosts } from "./costsActions";

const initialState={
    costs:[],
    error:"",
    laoding:false
}
export const costsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_COSTS_REQUEST:{
            return {comments:[],error:"",laoding:true}
        };
        case FETCH_COSTS_SUCCESS:{
            console.log(action.payload)
            return {comments:action.payload,error:"",laoding:false}
        };
        case FETCH_COSTS_FAILURE:{
            return {comments:[],error:action.payload,laoding:false}
        }

        case ADD_ONE_COMMENT:{
            axios.post(`http://localhost:4000/expenses`,action.payload)
            .then(res=>{
                console.log(state)
                return state;
            })
            .catch(err=>console.log(err.message))
           return state;
        };

        case DELETE_ONE_COST:{
            console.log(action.payload)
            axios.delete(`http://localhost:4000/expenses/${action.payload}`)
            .then(res=>{
                console.log(res.data);
                console.log({...state})
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
