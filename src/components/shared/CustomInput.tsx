import { FieldProps } from "formik";

const CustomInput: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}): JSX.Element => {
  function validate(e: any) {
    const input = e.target as HTMLInputElement;
    console.log(input.validity);
    input?.setCustomValidity("");
    console.log(input.name == "email");

    if (input.name == "email" && input.validity.typeMismatch) {
      input?.setCustomValidity("Введіть коректне значення пошти");
      return;
    }
    if (input.name == "password" && input.validity.tooShort) {
      input?.setCustomValidity(
        "Пароль має складатись не менше, ніж з 6 символів",
      );
      return;
    }
    input?.setCustomValidity("Заповнити поле");
  }

  return (
    <input
      {...field}
      {...props}
      onInvalid={(e) => validate(e)}
      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
    />
  );
};

export default CustomInput;
