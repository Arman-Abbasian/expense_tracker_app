import { AiOutlineDelete } from "react-icons/ai";
const CostReduxToolkit = ({name,cost,type,showDetail,onDelete}) => {
    return ( 
        <div onClick={showDetail} className={`bg-gray-200 border-r-8 rounded-sm grid grid-cols-3 gap-8 text-slate-900 w-full p-2 cursor-pointer ${type==="expense"?`border-r-red-500`:`border-r-green-500`}`}>
            <p className="flex justify-center items-center w-full">{name}</p>
            <p className="flex justify-center items-center w-full">{cost}$</p>
            <p className="flex justify-end items-center w-full h-full"><AiOutlineDelete onClick={(e)=>onDelete(e)} className="text-red-500"/></p>
        </div>
     );
}
export default CostReduxToolkit;