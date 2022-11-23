import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import CostDetail from "../components/CostDetail";
import Costs from "../components/Costs";
import  Form  from "../components/Form";
import ShowTotalCosts from "../components/ShowTotalCosts";
import { costCalculate } from "../utils/costCalculate";
import Filter from '../components/Filter';
import { tolerance } from "../utils/costCalculate";
import { filterValue } from "../utils/filterValue";


const Balance = () => {
    const [balance,setBalance]=useState({balance:null,error:null,loading:false});
    const [showBalance,setShowBalance]=useState(null);
    const [expense,setExpense]=useState({income:0,expense:0});
    const [showForm,setShowForm]=useState(false);
    const [costItem,setCostItem]=useState(null);
    const [filter,setFilter]=useState({name:"",costRange:0,kind:""});
    const [showFilterSection,setShowFilterSection]=useState(true)

    const fetchData=()=>{
        setBalance({balance:null,error:null,loading:true})
        axios.get('http://localhost:4000/expenses')
        .then(res=>{
            setBalance({balance:res.data,error:null,loading:false});
            setShowBalance(res.data);
            console.log(filter)
            setShowBalance(filterValue(res.data,filter));
           const data= costCalculate(res.data);
           setExpense({income:data.income,expense:data.expense})
        })
        .catch(err=>{
            setBalance({balance:null,error:err.message,loading:false})
        })
    };

    useEffect(()=>{
        fetchData();
    },[]);

    const addOneCostHandler=(formData)=>{
        console.log(formData)
        axios.post(`http://localhost:4000/expenses`,formData)
        .then(res=>{
            fetchData();
            toast.success("cost added successfully")
        })
        .catch(err=>toast.error(err.message))
    };

    const removeHandler=(e,id)=>{
        e.stopPropagation();
        console.log(e)
        axios.delete(`http://localhost:4000/expenses/${id}`)
        .then(res=>{
            fetchData();
            toast.success("cost deleted successfully")
        })
        .catch(err=>toast.error(err.message))
    };

    const showDetail=(id)=>{
        const selectedItem=balance.balance.find(item=>item.id===id);
        setCostItem(selectedItem);
        // setCostItem(state=>{
        //     setCostItem(state);
        //     console.log(state)
        //     return state;
        // })
        
    }
    const closeCostDetail=()=>{
        setCostItem(null);
    };
    const changeFilterHandler=(e)=>{
        console.log(e.target)
        setFilter({...filter,[e.target.name]:e.target.value});
    };
    const filterOption=(option)=>{
        setFilter(option);
        fetchData();
    };
    const resetHandler=()=>{
        setFilter({name:"",costRange:0,kind:""});
        fetchData();
    }

    const rendered=()=>{
        if(balance.loading) return <p>loading...</p>
        if(balance.error) return <p>{balance.error}</p>
        if(!balance.balance) return <p>no const existed</p>
        return (
                <div className="container flex flex-col mx-auto gap-4 max-w-xs">
                    <button onClick={()=>setShowFilterSection(!showFilterSection)} className="w-full p-2 bg-blue-500 rounded-sm">{showFilterSection?  "show Filter section" :"hide Filter section"}</button>
                    <Filter resetHandler={resetHandler}  balance={balance.balance} filter={filter} changeFilterHandler={changeFilterHandler} setFilterOption={filterOption} showFilterSection={showFilterSection}/>
                    <div className="flex items-center justify-between">
                        <p>Balance : {expense.income-expense.expense}$</p>
                        <button className="w-30 h-5 rounded-sm bg-blue-500 bg p-4 flex justify-center items-center" onClick={()=>setShowForm(!showForm)}>{showForm ? `close Form` :'Add cost'}</button>
                    </div>
                {showForm && <Form addOne={addOneCostHandler} setShowForm={()=>setShowForm(false)} className="transition-all duration-700" />}
                {!showForm &&<ShowTotalCosts expense={expense} />}
                {!showForm &&<Costs balance={showBalance} showDetail={showDetail} removeHandler={(e,id)=>removeHandler(e,id)} className="w-full" />}
                {costItem && <CostDetail costItem={costItem} closeCostDetail={closeCostDetail} fetchData={fetchData}/>}
            </div>
        )
    };
    return ( 
        <div>{rendered()}</div>
     );
}
 
export default Balance;