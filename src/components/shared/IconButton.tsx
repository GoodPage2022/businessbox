import { useRouter } from "next/router";

const IconButton = ({
  icon,
  borderColor,
  setPageNumber,
  onClick,
  backgroundColor,
}: {
  icon: any;
  borderColor: string;
  setPageNumber?: number;
  onClick?: any;
  backgroundColor?: string;
}) => {
  const router = useRouter();
  const { filters } = router.query;

  let filtersObj: any = {};

  if (!!setPageNumber) {
    if (filters && Array.isArray(filters)) {
      filters.map((f: string, i: number) => {
        if (i % 2 == 1) {
          if (filters[i - 1] == "page") {
            filtersObj[filters[i - 1]] = setPageNumber;
          } else {
            filtersObj[filters[i - 1]] = f;
          }
        }
      });
    } else {
      filtersObj["page"] = setPageNumber;
    }
  }

  return (
    <button
      onClick={() => {
        if (!!onClick) {
          onClick();
        } else {
          let urlPage = "/catalog";

          Object.keys(filtersObj).map((f: any) => {
            urlPage += "/" + f + "/" + filtersObj[f];
          });

          router.push(urlPage);
        }
      }}
      style={{ borderColor: borderColor, background: backgroundColor }}
      className="icon-button"
    >
      {icon}
    </button>
  );
};

export default IconButton;
