export const filterValue=(balance,filters)=>{
    console.log(balance);
    console.log(filters)
    const fiterKind=balance.filter(item=>item.type.includes(filters.kind));
    console.log(fiterKind);
    const filterName=fiterKind.filter(item=>item.name.includes(filters.name));
    console.log(filterName);
    let filterCostRange=filterName;
    filters.costRange===0 ?  
    filterCostRange=filterName.filter(item=>parseFloat(item.cost)>=filters.costRange)
    : 
    filterCostRange=filterName.filter(item=>parseFloat(item.cost)<=filters.costRange);  
        console.log(filterCostRange)
        return filterCostRange;
    }


