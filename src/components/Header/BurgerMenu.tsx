import Link from "next/link";
import router from "next/router";
import MainButton from "../shared/MainButton";
import { useSelector } from "react-redux";
import { MainContext } from "../../contexts/mainContext";
import React from "react";
import MainButtonRed from "../shared/MainButtonRed";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";
import Select from "react-select";

type CustomSelectProps = {
  options: any;
  placeholder?: string;
  side?: string;
  setter?: (e: any) => void;
};

const BurgerSelect: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
  placeholder,
  setter,
}): JSX.Element => {
  return (
    <Select
      styles={customStyles}
      name={field.name}
      options={options}
      classNamePrefix="burgerMenu__select"
      // menuIsOpen
      placeholder={placeholder}
      onChange={(e) => {
        if (!!setter) setter(e.value);
        form.setFieldValue(field.name, e.value);
      }}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ""
      }
    />
  );
};

const customStyles = {
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(90deg)" : null,
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    margin: "0",
    padding: 0,
    cursor: "pointer",
    boxShadow: "none",
  }),
  control: (styles: any, state: any) => ({}),

  valueContainer: (styles: any) => ({}),

  input: (styles: any) => ({
    ...styles,
    opacity: "0",
    margin: "0",
    padding: "0",
  }),
};

const initialValues = {
  categories: "",
};

const BurgerMenu = () => {
  const [state, dispatch] = React.useContext(MainContext);
  const user = useSelector((state: any) => state.auth.user);

  const openModal = () => {
    router.push("#auth");
    dispatch({ type: "toggle_authModal" });
  };

  const openAddBusiness = () => {
    router.push("/account/add-business");
    dispatch({ type: "toggle_burger" });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {},
  });

  return (
    <div className={`burgerMenu ${state.isOpenBurger ? "active" : ""}`}>
      <ul className="header__nav__menu">
        <li
          className="header__select header__nav__menu__item"
          onClick={() => dispatch({ type: "toggle_burger" })}
        >
          <FormikProvider value={formik}>
            <Field
              type="text"
              name="categories"
              required
              placeholder="Категорії"
              component={BurgerSelect}
              options={[
                { value: "category_1", label: "Категорія 1" },
                { value: "category_2", label: "Категорія 2" },
                { value: "category_3", label: "Категорія 3" },
                { value: "category_4", label: "Категорія 4" },
                { value: "category_5", label: "Категорія 5" },
                { value: "category_6", label: "Категорія 6" },
                { value: "category_7", label: "Категорія 7" },
              ]}
            />
          </FormikProvider>
        </li>
        <li
          className="header__nav__menu__item"
          onClick={() => dispatch({ type: "toggle_burger" })}
        >
          <Link href="/catalog">
            <a className="section__primary-text--white">Каталог бізнесів</a>
          </Link>
        </li>
        <li
          className="header__nav__menu__item   section__primary-text--white"
          onClick={() => dispatch({ type: "toggle_burger" })}
        >
          <Link href="#footer">
            <a className="section__primary-text--white">Контакти</a>
          </Link>
        </li>
      </ul>
      <ul className="burgerMenu__buttons">
        {user == null ? (
          <li className="burgerMenu__button" onClick={openModal}>
            <MainButton label={`Вхід`} />
          </li>
        ) : (
          ""
        )}

        <li
          className="burgerMenu__button"
          onClick={() => (user != null ? openAddBusiness() : openModal())}
        >
          <MainButtonRed label="Зареєструвати бізнес" />
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
