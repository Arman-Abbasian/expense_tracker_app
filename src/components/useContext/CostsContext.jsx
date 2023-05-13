import { useState } from "react";
import { useEffect } from "react";
import { useCostActions, useCosts } from "../../Providers/CostProvider";
import CostContext from "./CostContext";
import CostDetailContext from "./CostDetailContext";

const CostsContext = () => {
  const [costItem, setCostItem] = useState(null);
  const allcosts = useCosts();
  const { initialLoading, deleteOneCost } = useCostActions();

  useEffect(() => {
    initialLoading();
  }, []);
  const showItemDetail = (id) => {
    const item = allcosts.costs.cost.find((item) => item.id === id);
    setCostItem(item);
  };
  const rendered = () => {
    allcosts.costs.loading && <p>loading...</p>;
    allcosts.costs.error && <p>{allcosts.costs.error.message}</p>;
    !allcosts.costs.cost && <p>no cost added</p>;
    return (
      <div className="flex flex-col justify-center items-center gap-4 w-full mb-10">
        {costItem && (
          <CostDetailContext costItem={costItem} setCostItem={setCostItem} />
        )}
        {allcosts.costs.cost.map((item) => (
          <CostContext
            key={item.id}
            name={item.name}
            cost={item.cost}
            type={item.type}
            onDelete={(e) => deleteOneCost({ e: e, id: item.id })}
            showDetail={() => showItemDetail(item.id)}
          />
        ))}
      </div>
    );
  };

  return <>{rendered()}</>;
};

export default CostsContext;
