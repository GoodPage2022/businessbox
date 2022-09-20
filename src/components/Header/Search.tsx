import { Field, FormikProvider, useFormik } from "formik";
import SearchItems from "../../constants/search-items";
import SearchSVG from "../../assets/svg/search.svg";

const initialValues = {
  search: "",
};

const Search = ({ active }: any) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={`header__search ${active ? "active" : ""}`}>
      <FormikProvider value={formik}>
        <Field
          className={`header__input ${SearchItems.length > 0 ? "active" : ""}`}
          type="text"
          name="search"
          minLength={1}
          maxLength={255}
          required
          placeholder="кав’ярня"
        />

        {SearchItems.length > 0 ? (
          <ul className="header__search-list">
            {SearchItems.map(({ id, title, desc }: any) => (
              <li className="header__search-item" key={id}>
                <p className="header__search-item--title">{title}</p>
                <p className="header__search-item--desc">{desc}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="header__search-list">
            <li className="header__search-item">
              <p className="header__search-item--title">
                Спробуйте інші ключові слова
              </p>
              <p className="header__search-item--desc"></p>
            </li>
          </ul>
        )}
      </FormikProvider>
      <span className="header__search--icon">
        <SearchSVG />
      </span>
    </div>
  );
};

export default Search;
