import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";

const CostContext=createContext();
const CostContextDispatcher=createContext();


const CostProvider = ({children}) => {
    const [costs,setCosts]=useState({cost:[],loading:false,error:null});
    return ( 
        <div className="p-4">
            <CostContext.Provider value={costs}>
                <CostContextDispatcher.Provider value={setCosts}>
                     {children}
                </CostContextDispatcher.Provider>
            </CostContext.Provider>
        </div>
     );
}
 
export default CostProvider;
export const useCosts=()=>useContext(CostContext);
export const useCostActions=()=>{
    const costs=useCosts();
    const setCosts=useContext(CostContextDispatcher);

    //get data
    const initialLoading=()=>{
        setCosts({cost:[],loading:true,error:null})
        axios.get(`http://localhost:4000/expenses`)
        .then(res=>setCosts({cost:res.data,loading:false,error:null}))
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
    // const showDetail=(payload)=>{
    //     axios.get(`http://localhost:4000/expenses/${payload}`)
    //     .then(res=>{
    //       return (res.data)
    //     })
    //     .catch(err=>toast.error(err.message));
    // };          
        
        return {initialLoading,deleteOneCost,addOneCost};
    };
