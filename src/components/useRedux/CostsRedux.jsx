import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteOneCost, fetchCosts } from "../../redux/costs/costsAction";
import CostRedux from "./CostRedux";
import CostDetailRedux from "./CostDetailRedux";


const CostsRedux = () => {
    const [costItem,setCostItem]=useState(null)
    const allcosts=useSelector(state=>state.costs);
    const dispatch=useDispatch();
    console.log(allcosts)

    useEffect(()=>{dispatch(fetchCosts())},[]);
    const showItemDetail=(id)=>{
        const item=allcosts.costs.cost.find(item=>item.id===id);
        setCostItem(item);
    }
    const rendered=()=>{
        allcosts.costs.loading &&  <p>loading...</p>
        allcosts.costs.error &&  <p>{allcosts.costs.error.message}</p>
        !allcosts.costs.cost && <p>no cost added</p>
        return (
            <div className="flex flex-col justify-center items-center gap-4 w-full">
            {costItem && <CostDetailRedux costItem={costItem} setCostItem={setCostItem}/>}
            {allcosts.costs.map(item=>(
                <CostRedux key={item.id} name={item.name} cost={item.cost} type={item.type} onDelete={(e)=>dispatch(deleteOneCost({e:e,id:item.id}))} showDetail={()=>showItemDetail(item.id)} />
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
 
export default CostsRedux;