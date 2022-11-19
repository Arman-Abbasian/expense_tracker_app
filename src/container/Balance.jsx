import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import  Form  from "../components/Form";


const Balance = () => {
    const [balance,setBalance]=useState(null);
    useEffect(()=>{
        axios.get()
    },[])
    return ( 
        <div>
            <div className="flex items-center justify-between">
                <p>Balance : {balance}$</p>
                <button className="w-10 h-5 rounded-sm bg-blue-500">Add</button>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-red-700">
                        <p>Expense</p>
                        <p>20$</p>
                    </div>
                    <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-green-700">
                        <p>Expense</p>
                        <p>20$</p>
                    </div>
                </div>
            </div>
            <Form />
        </div>
     );
}
 
export default Balance;