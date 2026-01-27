import React from "react";
import { useFormik, Form, Field, ErrorMessage } from "formik";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { validate } from "graphql";

const Login = () => {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [submitMessage, setSubmitMessage] = React.useState(null);
  const [showMessage, SetShowMessage] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { data } = await loginUser({ variables: values });
        if (!data || !data.login) {
          throw new Error("no data returned from the server");
        }
        await Auth.login(data.login.token);
        console.log("user Logged in.");
      } catch (err) {
        console.log("Error:", err.message);
        console.log("Stack trace:", err.stack);
        setErrors({ submit: "could not login in user" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login flex justify-center ">
      <div className="">
        <h2 className="text-2xl font-semibold">Login</h2>
        <form
          className="flex flex-col items-start"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="pwd"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn"
            >
              LOGIN 
            </button>
          </div>
          {formik.errors.submit && <div>{formik.errors.submit}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
