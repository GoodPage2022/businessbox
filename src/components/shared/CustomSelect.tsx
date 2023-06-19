import { FieldProps } from "formik";
import Select from "react-select";

type CustomSelectProps = {
  options: any;
  placeholder?: string;
  side?: string;
  changeFilter?: (e: any) => void;
  setter?: (e: any) => void;
  isMulti?: boolean;
  defaultValue?: any;
  instanceId?: string;
};

const CustomSelect: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
  placeholder,
  setter,
  changeFilter,
  isMulti,
  defaultValue,
  instanceId,
}): JSX.Element => {
  if (field.name == "business") console.log([options[1], options[2]]);
  // console.log(field);

  return (
    <Select
      styles={customStyles}
      name={field.name}
      options={options}
      classNamePrefix="custom-select"
      instanceId={instanceId}
      // menuIsOpen
      isMulti={isMulti}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => {
        if (!!changeFilter && field.name == "sorting") {
          let sortName: string = "";
          switch (e.value) {
            case "decrease-popular":
              sortName = "sort-by-popular";
              break;
            case "increase-price":
              sortName = "sort-by-price";
              break;
            case "decrease-price":
              sortName = "sort-by-price";
              break;
            case "increase-date":
              sortName = "sort-by-date";
              break;
            case "decrease-date":
              sortName = "sort-by-date";
              break;
            default:
              break;
          }
          changeFilter({
            target: {
              name: sortName,
              value: e.value,
            },
          });
          return;
        }

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
        if (isMulti) {
          form.setFieldValue(
            field.name,
            e.map((i: any) => i.value)
          );
          if (!!changeFilter) {
            changeFilter({
              target: {
                name: field.name,
                value:
                  field.name == "state" || field.name == "city"
                    ? e.value
                    : e.map((i: any) => i.value),
              },
            });
          }

          if (!!setter) setter(e.map((i: any) => i.value));
        } else {
          if (!!setter) setter(e.value);
          form.setFieldValue(field.name, e.value);
        }
      }}
      value={
        isMulti
          ? options?.filter((option: any) =>
              field.value.includes(option.value)
            ) ?? ""
          : options?.find((option: any) => option.value === field.value) ?? ""
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
  option: (styles: any, state: any) => ({
    ...styles,
  }),
  valueContainer: (styles: any) => ({}),
  indicatorsContainer: (styles: any) => ({
    ...styles,
  }),

  input: (styles: any) => ({
    ...styles,
    // opacity: "0",
    // margin: "0",
    // padding: "0",
  }),
};

export default CustomSelect;
