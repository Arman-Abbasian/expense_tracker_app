import { AiOutlineDelete } from "react-icons/ai";
const Cost = ({name,cost,type,showDetail}) => {
    return ( 
        <div onClick={showDetail} className={`bg-gray-200 border-r-8 rounded-sm   flex justify-between items-center gap-8 text-slate-900 w-full p-2 cursor-pointer ${type==="expense"?`border-r-red-500`:`border-r-green-500`}`}>
            <p>{name}</p>
            <p>{cost}$</p>
            <AiOutlineDelete className="text-red-500"/>
        </div>
     );
}
 
export default Cost;