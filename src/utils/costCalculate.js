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
}