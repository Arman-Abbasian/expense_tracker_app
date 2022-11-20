const Cost = ({name,cost,type}) => {
    return ( 
        <div className={`bg-gray-200 border-r-8 rounded-sm   flex justify-between items-center gap-8 text-slate-900 w-full p-2 ${type==="expense"?`border-r-red-500`:`border-r-green-500`}`}>
            <p>{name}</p>
            <p>{cost}$</p>
        </div>
     );
}
 
export default Cost;