const data=[
    {id:1, name:"Ali",cost:20,type:"expense"},
    {id:1, name:"Ali",cost:20,type:"income"},
    {id:1, name:"Ali",cost:20,type:"expense"},
];

export const costCalculate=(data)=>{
    let income = 0;
    let expense = 0;
data.forEach(item => {
    if(item.type==="income"){
        income+=parseFloat(item.cost)
    }else {
        expense+=parseFloat(item.cost)
    }
});
return ({income,expense})
};

// export const tolerance=(balance)=>{
//     const expense=balance.filter(item=>item.type==="expense");
//     const income=balance.filter(item=>item.type==="income"); 
//     const expenseArray=expense.map(item=>item.cost);
//     const incomeArray=income.map(item=>item.cost);

//     const maxExpense = Math.max(...expenseArray)
//     const minExpense = Math.min(...expenseArray)
//     const maxIncome = Math.max(...incomeArray)
//     const minIncome = Math.min(...incomeArray)
//     return {maxExpense,minExpense,maxIncome,minIncome};

// }
export const tolerance=(balance)=>{
    const cost=balance.map(item=>item.cost);

    const maxCost = Math.max(...cost)
    const minCost = Math.min(...cost)
    return {maxCost,minCost};

}