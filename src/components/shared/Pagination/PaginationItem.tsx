import { useState } from "react";
import { useRouter } from "next/router";

const PaginationItem = ({ item, pageNumber }: { item: number, pageNumber: number }) => {
  const isCurrentPage = (pageNumber == item);  
  const router = useRouter();
  const { filters } = router.query;
  
  let filtersObj: any = {}

  if (filters && Array.isArray(filters)) {
    filters.map((f: string, i: number)=>{
      if (i % 2 == 1) {
        if (filters[i - 1] == 'page') {
          filtersObj[filters[i - 1]] = item
        } else {
          filtersObj[filters[i - 1]] = f
        }
      }
    })
  } else {
    filtersObj['page'] = item
  }

  return (
    <li
      onClick={()=>{
        let urlPage = "/catalog"

        Object.keys(filtersObj).map((f: any) => {
          urlPage += "/" + f + "/" + filtersObj[f]
        })
        console.log(filtersObj);
        
        router.push(urlPage)
      }}
      className={`pagination__item${isCurrentPage == true ? " active" : ""}`}
    >
      {item}
    </li>
  );
};

export default PaginationItem;
