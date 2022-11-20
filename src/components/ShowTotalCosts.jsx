const ShowTotalCosts = ({expense}) => {
    return ( 
        <div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-red-700">
                    <p>Expense</p>
                    <p>{expense.expense}$</p>
                </div>
                <div className="w-1/3 bg-gray-200 flex flex-col gap-2 items-center justify-center rounded-sm text-green-700">
                    <p>Income</p>
                    <p>{expense.income}$</p>
                </div>
            </div>
        </div>
     );
}
 
export default ShowTotalCosts;