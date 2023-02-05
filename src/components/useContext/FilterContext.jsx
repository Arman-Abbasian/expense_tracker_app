import { Slider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import { tolerance } from "../../utils/costCalculate";
import { uniqueOption } from "../../utils/uniqueValue";

const FilterContext = () => {
  const allcosts = useCosts();
  const { initialLoading, changeFilterState, resetFilters } = useCostActions();

  const [expenseTolerance, setExpenseTolerance] = useState([1000, 3000]);
  const [uniqueName, setUniqueName] = useState([]);
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [minMaxValue, setMinMaxValue] = useState(null);

  useEffect(() => {
    if (allcosts.costs.cost) {
      axios
        .get("http://localhost:4000/expenses")
        .then((res) => {
          let maxValue = Math.max(...res.data.map((o) => o.cost));
          let minValue = Math.min(...res.data.map((o) => o.cost));
          setMinMaxValue([minValue, maxValue]);
        })
        .catch((err) => toast.error(err.message));
    }
  }, []);

  useEffect(() => {
    //get the tolerance of your costs
    const cal = tolerance(allcosts.costs.cost);
    console.log(cal);
    setExpenseTolerance([cal.minCost, cal.maxCost]);
    //get the uniaue items of your costs
    const unique = uniqueOption(allcosts.costs.cost);
    setUniqueName(unique);
  }, [allcosts]);

  const handleChange = (e, newValue) => {
    changeFilterState(e, newValue);
  };
  const resetHandler = () => {
    resetFilters();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    initialLoading();
  };
  function valuetext(value) {
    return `${value} $`;
  }
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
              {expenseTolerance && minMaxValue && (
                <Slider
                  value={allcosts.filters.costRange}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={minMaxValue[0]}
                  max={minMaxValue[1]}
                  name="costRange"
                />
              )}
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
