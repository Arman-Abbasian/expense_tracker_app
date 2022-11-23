import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

const CostContext=createContext();
const CostContextDispatcher=createContext();


const CostProvider = ({children}) => {
    const [costs,setCosts]=useState({costs:[],loading:false,error:null});
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
export const useComments=()=>useContext(CostContext);
export const useCommentsActions=()=>{
    const comments=useComments();
    const setComments=useContext(CostContextDispatcher);

    //get data
    const initialLoading=()=>{
        setComments({...comments,comment:[],loading:true,error:""})
        axios.get(`http://localhost:4000/comments`)
        .then(res=>setComments({...comments,comment:res.data,loading:false,error:""}))
        .catch(err=>setComments({...comments,comment:[],loading:false,error:err.message}));
    };
    //add one comment
    const addOneComment=(payload)=>{
            axios.post(`http://localhost:4000/comments`,payload)
            .then(res=>{
                initialLoading();
                toast.success("new data added successfully")
            })
            .catch(err=>toast.error(err.message));
        };
        //delete one comment
    const deleteOneComment=(payload)=>{
        axios.delete(`http://localhost:4000/comments/${payload}`)
        .then(res=>initialLoading())
        .catch(err=>toast.error(err.message));
    };     
        
            return {initialLoading,addOneComment,deleteOneComment};
    };
