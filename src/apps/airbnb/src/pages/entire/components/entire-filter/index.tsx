import { memo, useState } from "react";
import classNames from "classnames";

import { FilterWrapper } from "./style";
import filterData from "@airbnb/assets/data/filter_data.json";

const EntireFilter = memo(() => {
  const [selectItems,setSelectItems] = useState([] as any)

  const itemClickHandle = (item) =>{
    let newItems = [...selectItems]  
    newItems.includes(item) ? newItems = newItems.filter(i => i !== item): newItems.push(item)
    console.log(newItems);
    setSelectItems(newItems)
  }
  return (
    <FilterWrapper>
      <div className="filter">
        {filterData.map((item) => {
          return (
            <div className={classNames("item",{active:selectItems.includes(item)})} key={item} onClick={()=>itemClickHandle(item)}>
              {item}
            </div>
          );
        })}
      </div>
    </FilterWrapper>
  );
});

export default EntireFilter;
