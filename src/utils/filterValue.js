export const filterValue=(balance,filters)=>{
    let filterKind=[];
    let filterName=[];

    if (filters.kind===''){
        filterKind=balance;
    }else{
        filterKind=balance.filter(item=>item.type===(filters.kind));
    }
    if (filters.name===''){
        filterName=filterKind;
    }else{
        filterName=filterKind.filter(item=>item.name===filters.name);
    }
    let filterCostRange=filterName.filter(item=>parseFloat(item.cost)>=filters.costRange[0])
    if(filters.costRange[1]===0){
        return filterCostRange
    }  else{
        filterCostRange=filterCostRange.filter(item=>parseFloat(item.cost)<=filters.costRange[1]);
        return filterCostRange;
    }
        
    };


