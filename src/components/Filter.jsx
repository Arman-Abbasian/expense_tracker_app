import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { tolerance } from "../utils/costCalculate";
import { uniqueOption } from "../utils/uniqueValue";

const Filter = ({filterOptions,balance,filter,changeFilterHandler,setFilterOption}) => {
    const [expenseTolerance,setExpenseTolerance]=useState(null);
    const [uniqueName,setUniqueName]=useState([]);
    
    useEffect(()=>{
        const cal= tolerance(balance);
        console.log(cal);
    const unique=uniqueOption(balance);
    console.log(unique)
    setUniqueName(unique)
        setExpenseTolerance(cal);
     },[]);

    
    const submitHandler=(e)=>{
        e.preventDefault();
        setFilterOption(filter)
};
 
    return ( 
        <div>
            {balance && expenseTolerance && uniqueName &&
           <form onSubmit={submitHandler}>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-start gap-1 w-full">
                        <label>kind</label>
                        <select name="kind" value={filter.kind} onChange={changeFilterHandler} className="text-black w-full rounded-sm">
                            <option value="">All</option>
                            <option value="income">income</option>
                            <option value="expense">expense</option>
                        </select> 
                    </div>

                    <div className="flex flex-col justify-center items-start gap-1 w-full">
                        <label>item</label>
                        <select name="name" value={filter.name} onChange={changeFilterHandler} className="text-black w-full rounded-sm">
                            <option value="">All</option>
                            {uniqueName.map(item=>{
                                return <option key={item} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="expense">expense range</label>
                    <Slider defaultValue={expenseTolerance.minCost} value={filter.expenseRange} min={expenseTolerance.minCost} max={expenseTolerance.maxCost} onChange={changeFilterHandler} name="costRange" aria-label="Default" valueLabelDisplay="auto" />
                </div>
                <input type="submit" value="apply filter" className="w-full p-2 bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-400" />
           </form>
           }
        </div>
     );
}
 
export default Filter;