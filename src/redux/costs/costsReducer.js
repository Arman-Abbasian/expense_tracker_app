import axios from "axios";
import { filterValue } from "../../utils/filterValue";
import { ADD_ONE_COST, DELETE_ONE_COST, FETCH_COSTS_FAILURE, FETCH_COSTS_REQUEST, FETCH_COSTS_SUCCESS, FILTER_COSTS } from "./costsType";


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
            console.log(state.filters)
            const filteredItems= filterValue(action.payload,state.filters);
            console.log(filteredItems)
            return {costs:filteredItems,error:"",laoding:false,filters:state.filters}
        };
        case FETCH_COSTS_FAILURE:{
            return {costs:[],error:action.payload,laoding:false}
        }

        case ADD_ONE_COST:{
            axios.post(`http://localhost:4000/expenses`,action.payload)
            .then(res=>{
                console.log(res.data)
                return {...state};
            })
            .catch(err=>console.log(err.message))
           return {...state};
        };

        case DELETE_ONE_COST:{
            action.payload.e.stopPropagation();
            axios.delete(`http://localhost:4000/expenses/${action.payload.id}`)
            .then(res=>{
                return {...state};
            })
            .catch(err=>console.log(err));
            return  {...state};
        };
        case FILTER_COSTS:{
            return {...state,filters:action.payload}
        };
            
        default:
            return state;
    }
}
export default costsReducer;
