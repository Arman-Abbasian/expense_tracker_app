import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import { ADD_ONE_COST, CHANGE_STATUS, DELETE_ONE_COST, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS, FILTER_COSTS } from "./costsType";


const initialState={
    costs:[],
    error:"",
    status:false,
    laoding:false
}
export const costsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_COSTS_REQUEST:{
            return {costs:[],error:"",laoding:true,status:false}
        };
        case FETCH_COSTS_SUCCESS:{
            return {costs:action.payload,error:"",laoding:false,status:true}
        };
        case FETCH_COSTS_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,status:false}
        }

        case ADD_ONE_COST:{
            axios.post(`http://localhost:4000/expenses`,action.payload)
            .then(res=>{
                console.log(res.data)
                return {...state,status:true};
            })
            .catch(err=>console.log(err.message))
           return {status:true};
        };

        case DELETE_ONE_COST:{
            action.payload.e.stopPropagation();
            axios.delete(`http://localhost:4000/expenses/${action.payload.id}`)
            .then(res=>{
                return {...state,status:true};
            })
            .catch(err=>console.log(err));
            return  {status:true};;
        };
        case FILTER_COSTS:{
           const filteredCosts= filterValue(state.costs,action.payload)
            return {...state,costs:filteredCosts};
        };
        case CHANGE_STATUS:{
            return {...state,status:false}
        };
            
        default:
            return state;
    }
}
export default costsReducer;
