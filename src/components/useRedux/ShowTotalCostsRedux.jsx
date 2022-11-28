import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormRedux from "./FormRedux";

const ShowTotalCostsRedux = () => {
    const allcosts=useSelector(state=>state.costs)
    const [totalExpenses,setTotalExpenses]=useState(0);
    const [totalIncomes,setTotalIncomes]=useState(0);
    const [showForm,setShowForm]=useState(false);

    useEffect(()=>{
        let income=0;
        let expense=0;
        allcosts.costs.forEach(item => {
            if(item.type==="expense"){
                expense+=parseFloat(item.cost)
            }
            else{
                income+=parseFloat(item.cost)
            }
        });
        setTotalExpenses(expense);
        setTotalIncomes(income);
    },[allcosts.costs])

    return ( 
        <div className="mb-10">
            <div>
                <div className="flex items-center justify-between mb-8">
                    <p>Balance : {totalIncomes-totalExpenses}$</p>
                    <button className="w-30 h-5 rounded-sm bg-blue-500 bg p-4 flex justify-center items-center" onClick={()=>setShowForm(!showForm)}>{showForm ? `close Form` :'Add cost'}</button>
                </div>
                <FormRedux showForm={showForm}/>
            </div>
                <div className="flex justify-between items-center">
                <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-red-700">
                    <p>Expense</p>
                    <p>{totalExpenses}$</p>
                </div>
                <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-green-700">
                    <p>Income</p>
                    <p>{totalIncomes}$</p>
                </div>
            </div>
        </div>
     );
}
 
export default ShowTotalCostsRedux;