import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit,AiFillEuroCircle,AiOutlineCalendar,AiOutlineClose } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useCostActions } from "../../Providers/CostProvider";
import { fetchCosts } from "../../redux/costs/costsAction";

const CostDetailRedux = ({costItem,setCostItem}) => {

    const {initialLoading}=useCostActions();
    const [formValues,setFormValues]=useState({name:costItem.name,cost:costItem.cost,type:costItem.type,date:costItem.date});

    const changeHandler=(e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        setCostItem(costItem)
    },[costItem]);

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:4000/expenses/${costItem.id}`,formValues)
        .then(res=>{
            toast.success("data changed successfully");
            fetchCosts();
            setCostItem(null);
        })
        .catch(err=>toast.error(err.message))
    };
    
    const closeHandler=()=>{
        setCostItem(null)
    };

    return ( 
        <>
        {costItem &&
        <div className="fixed w-screen h-screen z-20 top-0 left-0 bg-slate-400 bg-opacity-50 flex justify-center items-center">
            <div className="transition ease-in-out duration-1000 bg-slate-900 p-6 relative backdrop-blur-xl rounded-md">
                 
                    <form className="flex flex-col gap-4 container mx-auto max-w-xs " onSubmit={submitHandler}>
                        <AiOutlineClose onClick={closeHandler} className="absolute top-1 cursor-pointer right-1 z-10 text-gray-200" />
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
                        <input type="submit" value="implement change" className="bg-blue-500 p-2 rounded-sm cursor-pointer" />
                </form>
                
            </div>
        </div>
    }
    </>
     );
}
 
export default CostDetailRedux;