import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  phone: Yup.number().min(10).required("Please enter your Phone Number"),
  email: Yup.string().email().required("Please enter your email"),
  address: Yup.string().min(6).required("Please enter your Address"),
  status: Yup.string().required("please Select a Status"),
});
