import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import CostContext from "./CostContext";
import CostDetailContext from "./CostDetailContext";


const CostsContext = () => {
    const [costItem,setCostItem]=useState(null)
    const allcosts=useCosts();
    const {initialLoading,deleteOneCost}=useCostActions();

    useEffect(()=>{initialLoading()},[]);
    const showItemDetail=(id)=>{
        const item=allcosts.costs.cost.find(item=>item.id===id);
        setCostItem(item);
        console.log(costItem);
    }
    const rendered=()=>{
        allcosts.costs.loading &&  <p>loading...</p>
        allcosts.costs.error &&  <p>{allcosts.costs.error.message}</p>
        !allcosts.costs.cost && <p>no cost added</p>
        return (
            <div className="flex flex-col justify-center items-center gap-4 w-full">
            {costItem && <CostDetailContext costItem={costItem} />}
            {allcosts.costs.cost.map(item=>(
                <CostContext key={item.id} name={item.name} cost={item.cost} type={item.type} onDelete={()=>deleteOneCost(item.id)} showDetail={()=>showItemDetail(item.id)} />
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