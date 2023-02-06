import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import {DELETE_ONE_COST_FAILURE, DELETE_ONE_COST_SUCCESS, EDIT_ONE_COST_FAILURE, EDIT_ONE_COST_SUCCESS, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS, FILTER_COSTS, POST_ONE_COST_FAILURE, POST_ONE_COST_SUCCESS } from "./costsType";


const initialState={
    costs:[],
    error:"",
    laoding:false,
    filters:{name:"",costRange:[0,0],kind:""}
}
export const costsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_COSTS_REQUEST:{
            return {costs:[],error:"",laoding:true,filters:state.filters}
        };
        case FETCH_COSTS_SUCCESS:{
            const filteredItems= filterValue(action.payload,state.filters);
            console.log(action.payload,state.filters)
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case FETCH_COSTS_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        }
        case POST_ONE_COST_SUCCESS:{
            const filteredItems=filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case POST_ONE_COST_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        };

        //
        case DELETE_ONE_COST_SUCCESS:{
            const filteredItems=filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case DELETE_ONE_COST_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        };
        case EDIT_ONE_COST_SUCCESS:{
            const filteredItems=filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case EDIT_ONE_COST_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        };
        case FILTER_COSTS:{
            return {costs:state.costs,error:state.error,laoding:state.laoding,filters:action.payload}
        }
        
            
        default:
            return state;
    }
}
export default costsReducer;
