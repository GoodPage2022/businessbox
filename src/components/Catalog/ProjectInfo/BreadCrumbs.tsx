import Link from "next/link";

const Breadcrumbs = ({
  businessName,
  categories,
}: {
  businessName: string;
  categories: [string];
}) => {
  console.log(categories);

  return (
    <ul className="breadcrumbs">
      <li className="breadcrumbs__item section__secondary-text">
        <Link href="/">
          <a>
            Головна
            <span className="breadcrumbs__arrow">{">"}</span>
          </a>
        </Link>
      </li>
      <li className="breadcrumbs__item section__secondary-text">
        <Link href="/catalog">
          <a>
            Каталог
            <span className="breadcrumbs__arrow"> {">"}</span>
          </a>
        </Link>
      </li>
      <li className="breadcrumbs__item section__secondary-text">
        <Link href={`/catalog/category/${categories[0]}`}>
          <a>
            {categories[0]}
            <span className="breadcrumbs__arrow">{">"}</span>
          </a>
        </Link>
      </li>
      <li className="breadcrumbs__item section__secondary-text">
        {businessName}
      </li>
    </ul>
  );
};

export default Breadcrumbs;
