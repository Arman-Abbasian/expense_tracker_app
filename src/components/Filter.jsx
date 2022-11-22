import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { tolerance } from "../utils/costCalculate";

const Filter = ({filterOptions,balance}) => {
    const [filter,setFilter]=useState({name:"",expenseRange:"",incomeRange:""});
    const [expenseTolerance,setExpenseTolerance]=useState(null);
    
    useEffect(()=>{
        const cal= tolerance(balance);
        setExpenseTolerance(cal);
     },[]);

    const changeHandler=(e)=>{
        setFilter({...filter,[e.target.name]:e.target.value});
    };
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(filter)
};
 
    return ( 
        <div>
           <form onSubmit={submitHandler}>
           <select name="name" onChange={changeHandler}>
                <option>food</option>
                <option>income</option>
            </select>
           {expenseTolerance && 
             <>
                <div>
                    <label htmlFor="expense">expense range</label>
                    <Slider defaultValue={expenseTolerance.minExpense} min={expenseTolerance.minExpense} max={expenseTolerance.maxExpense} onChange={changeHandler} name="expenseRange" aria-label="Default" valueLabelDisplay="auto" />
                </div>
                <div>
                    <label htmlFor="income">income range</label>
                    <Slider defaultValue={expenseTolerance.minIncome} min={expenseTolerance.minIncome} max={expenseTolerance.maxIncome}  onChange={changeHandler} name="incomeRange" aria-label="Default" valueLabelDisplay="auto" />
                </div>
             </>
           
           }
           <input type="submit" value="filter" />
           </form>
        </div>
     );
}
 
export default Filter;