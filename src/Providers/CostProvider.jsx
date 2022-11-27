import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { costCalculate } from "../utils/costCalculate";
import { filterValue } from "../utils/filterValue";

const CostContext=createContext();
const CostContextDispatcher=createContext();


const CostProvider = ({children}) => {
    const [allcosts,setAllCosts]=useState({
        costs:{cost:[],loading:false,error:null},
        filters:{name:"",costRange:0,kind:""}
    });
    return ( 
        <div className="p-4">
            <CostContext.Provider value={allcosts}>
                <CostContextDispatcher.Provider value={setAllCosts}>
                    {children}
                </CostContextDispatcher.Provider>
            </CostContext.Provider>
        </div>
     );
};
 
export default CostProvider;
export const useCosts=()=>useContext(CostContext);
export const useCostActions=()=>{
    const allcosts=useCosts();
    const setAllCosts=useContext(CostContextDispatcher);

    //get data
    const initialLoading=()=>{
        setAllCosts({...allcosts,costs:{cost:[],loading:true,error:null}});
        axios.get(`http://localhost:4000/expenses`)
        .then(res=>{
            setAllCosts({...allcosts,costs:{cost:res.data,loading:false,error:null}});
            const filteredValues=filterValue(res.data,allcosts.filters);
            setAllCosts({...allcosts,costs:{cost:filteredValues,loading:false,error:null}});
            const data= costCalculate(allcosts.costs.cost);
        })
        .catch(err=>setAllCosts({...allcosts,costs:{cost:[],loading:false,error:err.message}}));
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
    const resetFilters=()=>{
        setAllCosts({...allcosts,filters:{name:"",costRange:0,kind:""}});
        console.log(allcosts.filters)
    };   
    //change filter state
   const changeFilterState=(payload)=>{
    setAllCosts({...allcosts,filters:{...allcosts.filters,[payload.target.name]:payload.target.value}});
};
        
        return {initialLoading,deleteOneCost,addOneCost,changeFilterState,resetFilters};
    };

