const Cost = ({name,cost}) => {
    return ( 
        <div className="bg-gray-200 border-r-2  border-r-red-500 flex justify-start items-center gap-8 text-slate-900">
            <p>{name}</p>
            <p>{cost}</p>
        </div>
     );
}
 
export default Cost;