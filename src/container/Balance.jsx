import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Costs from "../components/Costs";
import  Form  from "../components/Form";
import { costCalculate } from "../utils/costCalculate";


const Balance = () => {
    const [loading,setLoading]=useState(true)
    const [balance,setBalance]=useState({balance:null,error:null,loading:false});
    const [expense,setExpense]=useState({income:0,expense:0})

    const fetchData=()=>{
        setBalance({balance:null,error:null,loading:true})
        axios.get('http://localhost:4000/expenses')
        .then(res=>{
            setBalance({balance:res.data,error:null,loading:false});
           const data= costCalculate(res.data);
           setExpense({income:data.income,expense:data.expense})
        })
        .catch(err=>{
            setBalance({balance:null,error:err.message,loading:false})
        })
    };

    useEffect(()=>{fetchData()},[]);

    const addOneConstHandler=(formData)=>{
        axios.post(`http://localhost:4000/expenses`,formData)
        .then(res=>fetchData(res.data))
        .catch(err=>toast.error(err))
    }

    const rendered=()=>{
        if(balance.loading) return <p>loading...</p>
        if(balance.error) return <p>{balance.error}</p>
        if(!balance.balance) return <p>no const existed</p>
        console.log(balance.balance)
        return (
            <div className="container flex flex-col mx-auto gap-4 max-w-xs">
                <div className="flex items-center justify-between">
                    <p>Balance : {expense.income-expense.expense}$</p>
                    <button className="w-10 h-5 rounded-sm bg-blue-500">Add</button>
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-red-700">
                            <p>Expense</p>
                            <p>{expense.expense}$</p>
                        </div>
                        <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-green-700">
                            <p>Income</p>
                            <p>{expense.income}$</p>
                        </div>
                    </div>
                </div>
                <Form addOne={addOneConstHandler} />
                <Costs balance={balance.balance} className="w-full" />
            </div>
        )
    };


    return ( 
        <div>{rendered()}</div>
     );
}
 
export default Balance;