import LeftArrowSVG from "../../../assets/svg/left-arrow.svg";
import RightArrowSVG from "../../../assets/svg/right-arrow.svg";
import IconButton from "../IconButton";
import PaginationItem from "./PaginationItem";

const Pagination = ({ 
  pageNumber, countCards, cardsPerPage 
}: { 
  pageNumber: number, countCards: number, cardsPerPage: number 
}) => {
  const countPages = Math.ceil(countCards / cardsPerPage)

  return (
    <div className="pagination">
      <IconButton setPageNumber={(Number(pageNumber) - 1) < 1 ? 1 : (Number(pageNumber) - 1)} borderColor="#0C0C0C" icon={<LeftArrowSVG />} />
      <ul className="pagination__list">
        {Array.from(Array(countPages).keys()).map((item) => (
          <PaginationItem key={item + 1} item={item + 1} pageNumber={pageNumber} />
        ))}
      </ul>
      <IconButton setPageNumber={(Number(pageNumber) + 1) > countPages ? countPages : (Number(pageNumber) + 1)} borderColor="#0C0C0C" icon={<RightArrowSVG />} />
    </div>
  );
};

export default Pagination;