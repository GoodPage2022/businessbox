import Link from "next/link";
import { Field, FieldProps, FormikProvider, useFormik } from "formik";

import Select from "react-select";
import Networks from "./Networks";
import CopyrightSVG from "../../assets/svg/copyright.svg";

type CustomSelectProps = {
  options: any;
  placeholder?: string;
  side?: string;
  setter?: (e: any) => void;
};

const FooterSelect: React.FC<FieldProps & CustomSelectProps> = ({
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
      classNamePrefix="footer__select"
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

const Footer: React.FC = () => {
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
          <p className="section__secondary-text--white">Create by Good Page</p>
        </div>
        <div className="footer__categories">
          <FormikProvider value={formik}>
            <Field
              type="text"
              name="categories"
              required
              placeholder="Категорії"
              component={FooterSelect}
              options={[
                { value: "Торгівля", label: "Торгівля" },
                { value: "Ресторани", label: "Ресторани" },
                { value: "Послуги", label: "Послуги" },
                { value: "Автомобільна", label: "Автомобільна" },
                { value: "Виробництво", label: "Виробництво" },
                {
                  value: "ІТ та інтелектуальна власність",
                  label: "ІТ та інтелектуальна власність",
                },
                { value: "Інше", label: "Інше" },
              ]}
            />
          </FormikProvider>
        </div>
        <div className="footer__catalog">
          <Link href="/catalog">
            <a className="section__secondary-text--white footer__categories--button">
              Каталог бізнесів
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
              <a href="tel:0501234567">+38 (050) 123-45-67</a>
            </p>
            <p className="footer__contacts--item">
              <a href="mailto:example@gmail.com">example@gmail.com</a>
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
            <a href="tel:0501234567">+38 (050) 123-45-67</a>
          </p>
          <p className="footer__contacts--item">
            <a href="mailto:example@gmail.com">example@gmail.com</a>
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
          </div>
          <div className="footer__catalog">
            <Link href="/catalog">
              <a className="section__secondary-text--white footer__categories--button">
                Каталог бізнесів
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
          <p className="section__secondary-text--white">Create by Good Page</p>
          <p className="footer__contacts--text section__secondary-text--white">
            <CopyrightSVG className="footer__contacts--icon" />
            Copyright 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
