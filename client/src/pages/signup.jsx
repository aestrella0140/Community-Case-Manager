import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import { Link } from "react-router-dom";

const signup = () => {
    const [addUser, { loading }] = useMutation(ADD_USER);
    const [ submitMessage, setSubmitMessage ] = React.useState(null);
    const [ showMessage, SetShowMessage ] = React.useState(false);

    const userValidationSchema = Yup.object().shape({
        firstName: Yup.string().required("firstName is required."),
        lastName: Yup.string().required("lastName is required."),
        email: Yup.string().email("email is required."),
        gender: Yup.string(),
        genderOther: Yup.string(),
        ethnicity: Yup.string(),
        ethnicityOther: Yup.string(),
        role: Yup.string().required("Your role is required."),
    });

    return (
        <div>

        </div>
    )
};

export default signup;
