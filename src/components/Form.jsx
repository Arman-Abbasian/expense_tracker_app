import { useState } from "react";
import { AiFillEdit,AiFillEuroCircle } from "react-icons/ai";

const Form = ({addOne}) => {
    const [formValues,setFormValues]=useState({name:"",cost:0,type:""});
    const changeHandler=(e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value});
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        addOne(formValues)
    }
    return ( 
        <div>
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
                <input type="submit" value="Add" className="bg-blue-500 p-2 rounded-sm cursor-pointer" />
            </form>
        </div>
     );
}
 
export default Form;