import { useState } from "react";

const PaginationItem = ({ item }: { item: number }) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);

  return (
    <li
      onClick={() => setIsCurrentPage(true)}
      className={`pagination__item${isCurrentPage == true ? " active" : ""}`}
    >
      {item}
    </li>
  );
};

export default PaginationItem;
