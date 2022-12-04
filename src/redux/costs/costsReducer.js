import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import {DELETE_ONE_COST_FAILURE, DELETE_ONE_COST_SUCCESS, EDIT_ONE_COST_FAILURE, EDIT_ONE_COST_SUCCESS, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS, POST_ONE_COST_FAILURE, POST_ONE_COST_SUCCESS } from "./costsType";


const initialState={
    costs:[],
    error:"",
    laoding:false,
    filters:{name:"",costRange:0,kind:""}
}
export const costsReducer=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_COSTS_REQUEST:{
            console.log(state)
            return {costs:[],error:"",laoding:true,filters:state.filters}
        };
        case FETCH_COSTS_SUCCESS:{
            console.log(state)
            const filteredItems= filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case FETCH_COSTS_FAILURE:{
            console.log(state)
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        }
        case POST_ONE_COST_SUCCESS:{
            console.log(action.payload)
            const filteredItems=filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case POST_ONE_COST_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        };

        //
        case DELETE_ONE_COST_SUCCESS:{
            console.log(action.payload)
            const filteredItems=filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case DELETE_ONE_COST_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        };
        case EDIT_ONE_COST_SUCCESS:{
            console.log(action.payload)
            const filteredItems=filterValue(action.payload,state.filters);
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case EDIT_ONE_COST_FAILURE:{
            return {costs:[],error:action.payload,laoding:false,filters:state.filters}
        }
        
            
        default:
            return state;
    }
}
export default costsReducer;
