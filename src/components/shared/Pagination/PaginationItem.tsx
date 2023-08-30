import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PaginationItem = ({
  item,
  pageNumber,
  search,
}: {
  item: number;
  pageNumber: number;
  search?: string;
}) => {
  const isCurrentPage = pageNumber == item;
  const router = useRouter();
  const { filters } = router.query;
  const [path, setPath] = useState<string>("/catalog");
  let filtersObj: any = {};

  if (filters && Array.isArray(filters)) {
    filters.map((f: string, i: number) => {
      if (i % 2 == 1) {
        if (filters[i - 1] == "page") {
          filtersObj[filters[i - 1]] = item;
        } else {
          filtersObj[filters[i - 1]] = f;
          filtersObj["page"] = item;
        }
      } else {
        filtersObj["page"] = item;
      }
    });
  } else {
    filtersObj["page"] = item;
  }

  useEffect(() => {
    if (router.asPath.includes("invest")) {
      setPath("/invest/catalog");
    }
    if (router.asPath.includes("experts")) {
      setPath("/experts");
    }
  }, [router]);

  return (
    <li
      onClick={() => {
        let urlPage = search ? "/search/" + search : path;

        Object.keys(filtersObj).map((f: any) => {
          urlPage += "/" + f + "/" + filtersObj[f];
        });

        router.push(urlPage);
      }}
      className={`pagination__item${isCurrentPage == true ? " active" : ""}`}
    >
      {item}
    </li>
  );
};

export default PaginationItem;
