import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import { fetchCosts, filterCosts } from "../../redux/costs/costsAction";
import { tolerance } from "../../utils/costCalculate";
import { uniqueOption } from "../../utils/uniqueValue";

const FilterRedux = () => {
    const allcosts=useSelector(state=>state.costs)
    const dispatch=useDispatch();

    const [filters,setFilters]=useState({name:"",costRange:0,kind:""});
    const [expenseTolerance,setExpenseTolerance]=useState(null);
    const [uniqueName,setUniqueName]=useState([]);
    const [showFilterSection,setShowFilterSection]=useState(false)
    
    useEffect(()=>{
        //get the tolerance of your costs
        const cal= tolerance(allcosts.costs);
        //get the uniaue items of your costs
        const unique=uniqueOption(allcosts.costs);
        setUniqueName(unique)
        setExpenseTolerance(cal);
     },[allcosts]);

     const changeFilterState=(e)=>{
        setFilters({...filters,[e.target.name]:e.target.value})
     }

     const resetHandler=()=>{
        setFilters({name:"",costRange:0,kind:""});
        fetchCosts();
     }

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(fetchCosts());
        if(allcosts.costs.length>0){
        console.log(allcosts.costs.length)
        dispatch(filterCosts(filters))
    }
};

    return ( 
        <div className="mb-8">
            <button onClick={()=>setShowFilterSection(!showFilterSection)} className="w-full p-2 bg-blue-500 rounded-sm mb-2">{showFilterSection?  "hide Filter section" :"show Filter section"}</button>
            {allcosts.costs && showFilterSection &&
           <form onSubmit={submitHandler}>
            <button onClick={resetHandler} className="w-1/3 p-2 mb-2 rounded-sm bg-blue-500">Reset</button>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-start gap-1 w-full">
                        <label>kind</label>
                        <select name="kind" value={filters.kind} onChange={(e)=>changeFilterState(e)} className="text-black w-full rounded-sm">
                            <option value="">All</option>
                            <option value="income">income</option>
                            <option value="expense">expense</option>
                        </select> 
                    </div>

                    <div className="flex flex-col justify-center items-start gap-1 w-full">
                        <label>item</label>
                        <select name="name" value={filters.name} onChange={(e)=>changeFilterState(e)} className="text-black w-full rounded-sm">
                            <option value="">All</option>
                            {uniqueName.map(item=>{
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                </div>
                {expenseTolerance && 
                <div>
                    <label htmlFor="expense">expense range</label>  
                    <Slider defaultValue={expenseTolerance.minCost} value={filters.costRange} min={expenseTolerance.minCost} max={expenseTolerance.maxCost} onChange={(e)=>changeFilterState(e)} name="costRange" aria-label="Default" valueLabelDisplay="auto" />
                </div>
            }
                <input type="submit" value="apply filter" className="w-full p-2 bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-400" />
           </form>
}
        </div>
     );
}
 
export default FilterRedux;