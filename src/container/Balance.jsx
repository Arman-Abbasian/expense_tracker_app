import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import CostDetail from "../components/CostDetail";
import Costs from "../components/Costs";
import  Form  from "../components/Form";
import ShowTotalCosts from "../components/ShowTotalCosts";
import { costCalculate } from "../utils/costCalculate";


const Balance = () => {
    const [balance,setBalance]=useState({balance:null,error:null,loading:false});
    const [expense,setExpense]=useState({income:0,expense:0});
    const [showForm,setShowForm]=useState(false);
    const [costItem,setCostItem]=useState(null);

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
        .catch(err=>toast.error(err.message))
    }
    const showDetail=(id)=>{
        const selectedItem=balance.balance.find(item=>item.id===id);
        setCostItem(selectedItem);
        console.log(costItem)
    }

    const rendered=()=>{
        if(balance.loading) return <p>loading...</p>
        if(balance.error) return <p>{balance.error}</p>
        if(!balance.balance) return <p>no const existed</p>
        return (
            <div className="container flex flex-col mx-auto gap-4 max-w-xs">
                <div className="flex items-center justify-between">
                    <p>Balance : {expense.income-expense.expense}$</p>
                    <button className="w-30 h-5 rounded-sm bg-blue-500 bg p-4 flex justify-center items-center" onClick={()=>setShowForm(!showForm)}>{showForm ? `close Form` :'Add cost'}</button>
                </div>
                {showForm && <Form addOne={addOneConstHandler} className="transition-all duration-700" />}
                <ShowTotalCosts expense={expense} />
                <Costs balance={balance.balance} showDetail={showDetail} className="w-full" />
                {costItem && <CostDetail costItem={costItem} className="hidden"/>}
            </div>
        )
    };
    return ( 
        <div>{rendered()}</div>
     );
}
 
export default Balance;