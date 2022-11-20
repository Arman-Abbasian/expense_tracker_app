import axios from "axios";

export const fetchData=({setBalance,costCalculate,setExpense})=>{
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