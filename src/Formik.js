import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormikPage = () => {
  const [formValues, setFormValues] = useState(null);

  // * example backend data we hanve
  const savedData = {
    name: "saheb mim",
    email: "sahev@ex.com",
    phoneNumber: "09122471100",
    password: "Saheb!2#",
    passwordConfirm: "Saheb!2#",
    gender: "0",
  };

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    gender: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(6, "Name length is not valid"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Invalid Phone Number")
      .nullable(),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordConfirm: Yup.string()
      .required("PasswordConfirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    gender: Yup.string().required("Gender is required"),
  });
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <labe>Name</labe>
          <input type="text" {...formik.getFieldProps("name")} name="name" />
          {formik.errors.name && formik.touched.name && (
            <div>{formkit.errors.name}</div>
          )}
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...formik.getFieldProps("email")} name="email" />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>PhoneNumber</label>
          <input
            type="email"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div>{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <div>
          <label>PasswordConfirmation</label>
          <input
            type="password"
            {...formik.getFieldProps("passwordConfirm")}
            name="passwordConfirm"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div>{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <div>
          <input
            type="radio"
            id="0"
            name="gender"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlfor="0">Male</label>
          <input
            type="radio"
            id="1"
            name="gender"
            value="1"
            onChange={formik.handleChange}
            checked={formkit.values.gender === "1"}
          />
          <label htmlfor="1">Female</label>
          {formik.errors.gender && formik.touched.gender && (
            <div>{formik.errors.gender}</div>
          )}
        </div>
        <button onClick={() => setFormValues(savedData)}>load data</button>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormikPage;
