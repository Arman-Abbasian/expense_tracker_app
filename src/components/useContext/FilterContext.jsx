import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import { tolerance } from "../../utils/costCalculate";
import { uniqueOption } from "../../utils/uniqueValue";

const FilterContext = () => {
  const allcosts = useCosts();
  const { initialLoading, changeFilterState, resetFilters } = useCostActions();

  const [expenseTolerance, setExpenseTolerance] = useState([1000, 3000]);
  const [uniqueName, setUniqueName] = useState([]);
  const [showFilterSection, setShowFilterSection] = useState(false);

  useEffect(() => {
    //get the tolerance of your costs
    const cal = tolerance(allcosts.costs.cost);
    console.log(cal);
    setExpenseTolerance([cal.minCost, cal.maxCost]);
    //get the uniaue items of your costs
    const unique = uniqueOption(allcosts.costs.cost);
    setUniqueName(unique);
  }, [allcosts]);

  const resetHandler = () => {
    resetFilters();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    initialLoading();
  };
  function valuetext(expenseTolerance) {
    return `${expenseTolerance}$`;
  }
  const handleChange = (e, newValue) => {
    setExpenseTolerance(newValue);
  };
  return (
    <div className="mb-8">
      <button
        onClick={() => setShowFilterSection(!showFilterSection)}
        className="w-full p-2 bg-blue-500 rounded-sm mb-2"
      >
        {showFilterSection ? "hide Filter section" : "show Filter section"}
      </button>
      {allcosts.costs.cost && showFilterSection && (
        <form onSubmit={submitHandler}>
          <button
            onClick={resetHandler}
            className="w-1/3 p-2 mb-2 rounded-sm bg-blue-500"
          >
            Reset
          </button>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col justify-center items-start gap-1 w-full">
              <label>kind</label>
              <select
                name="kind"
                value={allcosts.filters.kind}
                onChange={(e) => changeFilterState(e)}
                className="text-black w-full rounded-sm"
              >
                <option value="">All</option>
                <option value="income">income</option>
                <option value="expense">expense</option>
              </select>
            </div>

            <div className="flex flex-col justify-center items-start gap-1 w-full">
              <label>item</label>
              <select
                name="name"
                value={allcosts.filters.name}
                onChange={(e) => changeFilterState(e)}
                className="text-black w-full rounded-sm"
              >
                <option value="">All</option>
                {uniqueName.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {expenseTolerance && (
            <div>
              <label htmlFor="expense">expense range</label>
              {/* <Slider
                defaultValue={expenseTolerance.minCost}
                value={allcosts.filters.costRange}
                min={expenseTolerance.minCost}
                max={expenseTolerance.maxCost}
                onChange={(e) => changeFilterState(e)}
                name="costRange"
                aria-label="Default"
                valueLabelDisplay="auto"
              /> */}
              <Slider
                value={expenseTolerance}
                min={expenseTolerance[0]}
                max={expenseTolerance[1]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </div>
          )}
          <input
            type="submit"
            value="apply filter"
            className="w-full p-2 bg-blue-500 rounded-sm cursor-pointer hover:bg-blue-400"
          />
        </form>
      )}
    </div>
  );
};

export default FilterContext;
