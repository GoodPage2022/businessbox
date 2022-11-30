import { Field, FormikProvider, useFormik } from "formik";
// import SearchItems from "../../constants/search-items";
import SearchSVG from "../../assets/svg/search.svg";
import { useEffect, useRef } from "react";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import useOnClickOutside from "../../utils/useOnClickOutside";
import axios from "axios";
import { useRouter } from "next/router";

const initialValues = {
  search: "",
};

const CancelToken = axios.CancelToken;
let cancel: any;

const Search = () => {
  const [state, dispatch] = React.useContext(MainContext);
  const [searchItems, setSearchItems] = React.useState<any>([]);
  const [hasItems, setHasItems] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const searchInput = useRef<any>(null);
  const router = useRouter();
  const ref = useRef();

  useOnClickOutside(ref, () => {
    if (state.isActiveHeaderSearch) {
      dispatch({ type: "toggle_headerSearch" });
    }
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      dispatch({ type: "toggle_headerSearch" });
      router.push('/search/' + values.search);
    },
  });

  useEffect(() => {
    (document.querySelector(".header__input") as HTMLElement).focus();
  }, [state.isActiveHeaderSearch]);

  const handleSearchChange = async (e: any) => {
    if (cancel !== undefined) {
      cancel();
    }

    if (e.keyCode == 13) {
      formik.handleSubmit()
      return true
    }
    

    setSearchValue(e.target.value);

    const requestBody = {
      filter: e.target.value,
    };

    const options = {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };

    const response = await axios.post(`/api/search/get`, requestBody, options);

    setSearchItems(response.data.entries ?? []);
  };

  useEffect(() => {
    if (searchValue != "") setHasItems(true);
  }, [searchItems, searchValue]);

  const handleSearchItemRouting = (id: any) => {
    dispatch({ type: "toggle_headerSearch" });
    router.push("/catalog/" + id);
  };

  return (
    <div
      className={`header__search ${state.isActiveHeaderSearch ? "active" : ""}`}
    >
      <FormikProvider value={formik}>
        <Field
          className={`header__input ${searchItems.length > 0 ? "active" : ""}${
            hasItems ? " hasItems" : ""
          }`}
          type="text"
          name="search"
          autoComplete="off"
          minLength={1}
          innerRef={ref}
          maxLength={255}
          required
          placeholder="кав’ярня"
          onKeyUp={handleSearchChange}
        />

        {searchItems.length > 0 ? (
          <ul className={`header__search-list`}>
            {searchItems.map(({ _id, title, description }: any) => (
              <li
                className="header__search-item"
                key={_id}
                onClick={() => handleSearchItemRouting(_id)}
              >
                <p className="header__search-item--title">{title}</p>
                <p className="header__search-item--desc">
                  {description?.replace(/(<([^>]+)>)/gi, "")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="header__search-list">
            <li className="header__search-item">
              <p className="header__search-item--title">
                {searchValue == "" ? "" : "Спробуйте інші ключові слова"}
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
