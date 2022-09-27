import { Field, FormikProvider, useFormik } from "formik";
import SearchItems from "../../constants/search-items";
import SearchSVG from "../../assets/svg/search.svg";
import { useEffect, useRef } from "react";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import useOnClickOutside from "../../utils/useOnClickOutside";

const initialValues = {
  search: "",
};

const Search = () => {
  const ref = useRef();

  useOnClickOutside(
    ref,
    () => {
      if (state.isActiveHeaderSearch) {
        dispatch({ type: "toggle_headerSearch" });
      }
    },
    "header__search-item--desc",
    "header__search-item--title",
  );

  const [state, dispatch] = React.useContext(MainContext);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    (document.querySelector(".header__input") as HTMLElement).focus();
  }, [state.isActiveHeaderSearch]);

  return (
    <div
      className={`header__search ${state.isActiveHeaderSearch ? "active" : ""}`}
    >
      <FormikProvider value={formik}>
        <Field
          // onBlur={(e: any) => {
          //   if (state.isActiveHeaderSearch)
          //     dispatch({ type: "toggle_headerSearch" });
          // }}
          className={`header__input ${SearchItems.length > 0 ? "active" : ""}`}
          type="text"
          name="search"
          autoComplete="off"
          minLength={1}
          innerRef={ref}
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
