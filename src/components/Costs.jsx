import Cost from "./Cost";

const Costs = ({balance,showDetail,removeHandler}) => {
    return ( 
        <>
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            {balance.map(item=>(
                <Cost key={item.id} name={item.name} cost={item.cost} type={item.type} onDelete={(e)=>removeHandler(e,item.id)} showDetail={()=>showDetail(item.id)} />
            ))}
        </div>
        </>
     );
}
 
export default Costs;