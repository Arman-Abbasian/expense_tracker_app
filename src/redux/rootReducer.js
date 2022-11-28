import { combineReducers } from "redux";
import costsReducer from "./costs/costsReducer";


const rootReducer=combineReducers({
    costs:costsReducer
});
export default rootReducer;
