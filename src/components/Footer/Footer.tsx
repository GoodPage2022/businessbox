import Link from "next/link";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";
import Image from "next/image";

import Select from "react-select";
import Networks from "./Networks";
import CopyrightSVG from "../../assets/svg/copyright.svg";
import OurCategories from "../../constants/categories-select";
import { useRouter } from "next/router";
import { MainContext } from "../../contexts/mainContext";
import { useContext } from "react";
import ModalPayment from "../Modals/Modal-payment/Modal-payment";

type CustomSelectProps = {
  options: any;
  placeholder?: string;
  side?: string;
  setter?: (e: any) => void;
  changeFilter?: (e: any) => void;
};

const FooterSelect: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
  placeholder,
  setter,
  changeFilter,
}): JSX.Element => {
  return (
    <Select
      styles={customStyles}
      name={field.name}
      options={options}
      classNamePrefix="footer__select"
      // menuIsOpen
      placeholder={placeholder}
      onChange={(e) => {
        if (!!changeFilter)
          changeFilter({
            target: {
              name: field.name,
              value:
                field.name == "state" || field.name == "city"
                  ? e.value
                  : e.label,
            },
          });
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

const Footer: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useContext(MainContext);

  const changeFilter = (e: any) => {
    let filtersUrl = `/catalog/category/${e.target.value}`;
    router.push(filtersUrl);
  };

  const closeModalPayment = () => {
    dispatch({ type: "toggle_paymentModal" });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <footer className="footer" id="footer">
      <div className="container footer__container--desctop">
        <div className="footer__logo">
          <Link href="/">
            <a className="footer__logo__text">Business Box</a>
          </Link>
          <Networks />
          <p className="section__secondary-text--white">
            Created by{" "}
            <Link href="https://goodpage.studio">
              <a target="_blank" className="section__secondary-text--white">
                Good Page
              </a>
            </Link>
          </p>
        </div>
        <div className="footer__categories">
          <FormikProvider value={formik}>
            <Field
              type="text"
              name="categories"
              required
              changeFilter={changeFilter}
              placeholder="Категорії"
              component={FooterSelect}
              options={OurCategories}
            />
          </FormikProvider>
          <div className="footer__images">
            <div
              className="footer__image"
              onClick={() => {
                dispatch({ type: "toggle_paymentModal" });
                state.method = "mastercard";
              }}
            >
              <Image
                className=""
                src="/assets/images/mastercard-logo.png"
                layout="fill"
                objectFit="contain"
                alt="card-image"
              />
            </div>
            <div
              className="footer__image"
              onClick={() => {
                dispatch({ type: "toggle_paymentModal" });
                state.method = "visa";
              }}
            >
              <Image
                className=""
                src="/assets/images/visa-logo.png"
                layout="fill"
                objectFit="contain"
                alt="card-image"
              />
            </div>
          </div>
        </div>
        <div className="footer__catalog">
          <Link href="/catalog">
            <a className="section__secondary-text--white footer__categories--button">
              Купівля бізнесу
            </a>
          </Link>
          <Link href="/information/about-us">
            <a className="section__secondary-text--white footer__categories--button">
              Про нас
            </a>
          </Link>
          <Link href="/information/delivery-payment">
            <a className="section__secondary-text--white footer__categories--button">
              Оплата і надання послуг
            </a>
          </Link>
          <Link href="/information/public-offer">
            <a className="section__secondary-text--white footer__categories--button">
              Публічна оферта
            </a>
          </Link>
          <Link href="/information/privacy-policy">
            <a className="section__secondary-text--white footer__categories--button">
              Умови конфіденційності
            </a>
          </Link>
        </div>

        <div className="footer__contacts">
          <Link href="#footer">
            <a className="section__secondary-text--white footer__categories--button">
              Контакти
            </a>
          </Link>
          <div>
            <p className="footer__contacts--item">
              <a href="tel:0662026304">+38 (066) 202-63-04</a>
            </p>
            <p className="footer__contacts--item">
              <a href="mailto:info@bissbox.com">info@bissbox.com</a>
            </p>
          </div>
          <p className="footer__contacts--text section__secondary-text--white">
            <CopyrightSVG className="footer__contacts--icon" />
            Copyright 2022. All rights reserved.
          </p>
        </div>
      </div>
      <div className="container footer__container--mob">
        <div className="footer__logo">
          <Link href="/">
            <a className="footer__logo__text">Business Box</a>
          </Link>
        </div>
        <Networks />
        <div>
          <p className="footer__contacts--item">
            <a href="tel:0662026304">+38 (066) 202-63-04</a>
          </p>
          <p className="footer__contacts--item">
            <a href="mailto:info@bissbox.com">info@bissbox.com</a>
          </p>
        </div>
        <div className="footer__nav">
          <div className="footer__categories">
            <FormikProvider value={formik}>
              <Field
                type="text"
                name="categories"
                required
                placeholder="Категорії"
                component={FooterSelect}
                options={OurCategories}
              />
            </FormikProvider>
            <div className="footer__images">
              <div
                className="footer__image"
                onClick={() => {
                  dispatch({ type: "toggle_paymentModal" });
                  state.method = "mastercard";
                }}
              >
                <Image
                  className=""
                  src="/assets/images/mastercard-logo.png"
                  layout="fill"
                  objectFit="contain"
                  alt="card-image"
                />
              </div>
              <div
                className="footer__image"
                onClick={() => {
                  dispatch({ type: "toggle_paymentModal" });
                  state.method = "visa";
                }}
              >
                <Image
                  className=""
                  src="/assets/images/visa-logo.png"
                  layout="fill"
                  objectFit="contain"
                  alt="card-image"
                />
              </div>
            </div>
          </div>
          <div className="footer__catalog">
            <Link href="/catalog">
              <a className="section__secondary-text--white footer__categories--button">
                Купівля бізнесу
              </a>
            </Link>
            <Link href="/information/about-us">
              <a className="section__secondary-text--white footer__categories--button">
                Про нас
              </a>
            </Link>
            <Link href="/information/delivery-payment">
              <a className="section__secondary-text--white footer__categories--button">
                Оплата і надання послуг
              </a>
            </Link>
            <Link href="/information/public-offer">
              <a className="section__secondary-text--white footer__categories--button">
                Публічна оферта
              </a>
            </Link>
            <Link href="/information/privacy-policy">
              <a className="section__secondary-text--white footer__categories--button">
                Умови конфіденційності
              </a>
            </Link>
          </div>
          <Link href="#footer">
            <a className="section__secondary-text--white footer__categories--button">
              Контакти
            </a>
          </Link>
        </div>

        <div className="footer__contacts">
          <p className="section__secondary-text--white">
            Created by{" "}
            <Link href="https://goodpage.studio">
              <a target="_blank" className="section__secondary-text--white">
                Good Page
              </a>
            </Link>
          </p>
          <p className="footer__contacts--text section__secondary-text--white">
            <CopyrightSVG className="footer__contacts--icon" />
            Copyright 2022. All rights reserved.
          </p>
        </div>
      </div>
      <ModalPayment onClose={closeModalPayment} />
    </footer>
  );
};

export default Footer;
