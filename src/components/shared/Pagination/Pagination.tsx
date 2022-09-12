import LeftArrowSVG from "../../../assets/svg/left-arrow.svg";
import RightArrowSVG from "../../../assets/svg/right-arrow.svg";
import IconButton from "../IconButton";
import PaginationItem from "./PaginationItem";

const Pagination = () => {
  return (
    <div className="pagination">
      <IconButton borderColor="#0C0C0C" icon={<LeftArrowSVG />} />
      <ul className="pagination__list">
        {[1, 2, 3].map((item) => (
          <PaginationItem key={item} item={item} />
        ))}
      </ul>
      <IconButton borderColor="#0C0C0C" icon={<RightArrowSVG />} />
    </div>
  );
};

export default Pagination;
