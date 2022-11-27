import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import CostContext from "./CostContext";


const CostsContext = ({}) => {
    const [selectedItem,setSelectedItem]=useState(null)
    const allcosts=useCosts();
    const {initialLoading,deleteOneCost}=useCostActions();

    useEffect(()=>{initialLoading()},[]);
    const showItemDetail=(id)=>{
        setSelectedItem(id)
    }
    const rendered=()=>{
        allcosts.costs.loading &&  <p>loading...</p>
        allcosts.costs.error &&  <p>{allcosts.costs.error.message}</p>
        !allcosts.costs.cost && <p>no cost added</p>
        return (
            <div className="flex flex-col justify-center items-center gap-4 w-full">
            
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