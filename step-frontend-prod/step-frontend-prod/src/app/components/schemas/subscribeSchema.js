import * as Yup from "yup";
export const subscribeSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email is in invalid format")
    .email("Invalid email format")
    .required("Email is required")
    .test(
      "not-uppercase",
      "Email should not be entirely in uppercase letters",
      (value) => value !== value.toUpperCase()
    ),
});
