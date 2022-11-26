import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { costCalculate } from "../utils/costCalculate";
import { filterValue } from "../utils/filterValue";

const CostContext=createContext();
const CostContextDispatcher=createContext();
const FilterContext=createContext();
const FilterContextDispatcher=createContext();



const CostProvider = ({children}) => {
    const [costs,setCosts]=useState({cost:[],loading:false,error:null});
    const [filter,setFilter]=useState({name:"",costRange:0,kind:""});
    return ( 
        <div className="p-4">
            <CostContext.Provider value={costs}>
                <CostContextDispatcher.Provider value={setCosts}>
                    <FilterContext.Provider value={filter}>
                        <FilterContextDispatcher.Provider value={setFilter}>
                            {children}
                        </FilterContextDispatcher.Provider>
                    </FilterContext.Provider>
                </CostContextDispatcher.Provider>
            </CostContext.Provider>
        </div>
     );
}
 
export default CostProvider;
export const useCosts=()=>useContext(CostContext);
export const useFilters=()=>useContext(FilterContext)
export const useCostActions=()=>{
    const costs=useCosts();
    const filter=useFilters();
    const setCosts=useContext(CostContextDispatcher);

    //get data
    const initialLoading=()=>{
        setCosts({cost:[],loading:true,error:null})
        axios.get(`http://localhost:4000/expenses`)
        .then(res=>{
            setCosts({cost:res.data,loading:false,error:null});
            filterValue(res.data,filter);
            const data= costCalculate(res.data);
        })
        .catch(err=>setCosts({cost:[],loading:false,error:err.message}));
    };
    //add one comment
    const addOneCost=(payload)=>{
            axios.post(`http://localhost:4000/expenses`, payload)
            .then(res=>{
                toast.success("new data added successfully");
                initialLoading();
            })
            .catch(err=>toast.error(err.message));
        };
        //delete one comment
    const deleteOneCost=(payload)=>{
        axios.delete(`http://localhost:4000/expenses/${payload}`)
        .then(res=>{
            toast.success("cost deleted successfully");
            initialLoading();
        })
        .catch(err=>toast.error(err.message));
    };        
        
        return {initialLoading,deleteOneCost,addOneCost};
    };

export const useFilterActions=()=>{
    const filter=useFilters();
    const setFilter=useContext(FilterContextDispatcher);

   //change filter state
   const changeFilterState=(payload)=>{
    setFilter({...filter,[payload.target.name]:payload.target.value});
};
    const filterCosts=()=>{
        filterValue()
}
return {changeFilterState, filterCosts};
};
