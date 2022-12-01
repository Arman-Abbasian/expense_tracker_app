import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit,AiFillEuroCircle,AiOutlineCalendar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {addAsyncCost, filterAsyncCosts, getAsyncCosts} from '../../feature/costsSlice.js';

const FormRedux = ({showForm}) => {
    const [formValues,setFormValues]=useState({name:"",cost:0,type:"",date:""});
    const allcosts=useSelector(state=>state.costs)
    const dispatch=useDispatch();
    const changeHandler=(e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value});
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(addAsyncCost(formValues));
        dispatch(getAsyncCosts(allcosts.filters));
        toast.success('data added successfully');
        setFormValues({name:"",cost:0,type:"",date:""});
    }
    return ( 
        <div className={`transition ease-in-out duration-1000 ${showForm? "block":"hidden"}`}>
            <form className="flex flex-col gap-4 container mx-auto max-w-xs" onSubmit={submitHandler}>
                <div className=" relative">
                    <input className=" rounded-sm py-2 px-8 text-slate-900 w-full" type="text" name="name" value={formValues.name} onChange={changeHandler} placeholder="enter the name" />
                    <AiFillEdit className="absolute top-1/4 left-1 text-black" />
                </div>
                <div className=" relative">
                    <input className=" rounded-sm py-2 px-8 text-slate-900 w-full" type="number" name="cost" value={formValues.cost} onChange={changeHandler} placeholder="enter the cost" />
                    <AiFillEuroCircle className="absolute top-1/4 left-1 text-black" />
                </div>
                <div className="flex justify-center items-center gap-8 w-full">
                    <div className="flex justify-center items-center gap-1">
                        <input type="radio" id="expense" name="type" value="expense" onChange={changeHandler} checked={formValues.type==="expense"} />
                        <label htmlFor="expense">expense</label>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <input type="radio" id="income" name="type" value="income" onChange={changeHandler} checked={formValues.type==="income"} />
                        <label htmlFor="income">income</label>
                    </div>
                </div>
                <div className=" relative">
                    <input className=" rounded-sm py-2 px-8 text-slate-900 w-full" type="date" name="date" value={formValues.date} onChange={changeHandler} placeholder="enter the cost" />
                    <AiOutlineCalendar className="absolute top-1/4 left-1 text-black" />
                </div>
                <input type="submit" value="Add"   className="bg-blue-500 p-2 rounded-sm cursor-pointer mb-10" />
            </form>
        </div>
     );
}
 
export default FormRedux;