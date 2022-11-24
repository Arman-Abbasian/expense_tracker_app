import { useEffect, useState } from "react";
import { useCosts } from "../../Providers/CostProvider";

const ShowTotalCostsContext = ({expense}) => {
    const costs=useCosts();
    const {initialLoading,deleteOneCost}=useCostActions();
    const [totalExpenses,setTotalExpenses]=useState(0);
    const [totalIncomes,setTotalIncomes]=useState(0);

    useEffect(()=>{
        let income=0;
        let expense=0;
        costs.forEach(item => {
            if(item.type==="expense"){
                expense+=item.cost
            }
            else{
                income+=item.cost
            }
        });
        setTotalExpenses(expense);
        setTotalIncomes(expense);
    },[])

    return ( 
        <div>
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
 
export default ShowTotalCostsContext;