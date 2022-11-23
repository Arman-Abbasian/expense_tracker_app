import { useState } from "react";
import { useEffect } from "react";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import CostContext from "./CostContext";


const CostsContext = ({}) => {
    const [selectedItem,setSelectedItem]=useState(null);
    const costs=useCosts();
    const {initialLoading,deleteOneComment,showDetail}=useCostActions();

    useEffect(()=>{initialLoading()},[])

    const showItemDetail=(id)=>{
       const d= showDetail(id);
       console.log(d)
       

    }

    const rendered=()=>{
        costs.loading &&  <p>loading...</p>
        costs.error &&  <p>{costs.error.message}</p>
        !costs.cost && <p>no cost added</p>
        return (
            <div className="flex flex-col justify-center items-center gap-4 w-full">
            {costs.cost.map(item=>(
                <CostContext key={item.id} name={item.name} cost={item.cost} type={item.type} onDelete={()=>deleteOneComment(item.id)} showDetail={()=>showItemDetail(item.id)} />
            ))}
        </div>
        )
    };

    return ( 
        <>
            {rendered()}
        </>
     );
}
 
export default CostsContext;