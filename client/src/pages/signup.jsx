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
            <Formik initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                gender: "",
                genderOther: "",
                ethnicity: "",
                ethnicityOther: "",
                role: "",
            }}
            validationSchema={userValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                addUser({
                    variables: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        gender: values.gender,
                        genderOther: values.genderOther,
                        ethnicity: values.ethnicity,
                        ethnicityOther: values.ethnicityOther,
                        role: values.role,
                    },
                }).then(({ data, errors }) => {
                    if (errors) {
                        throw new Error("GraphQL error");
                    }
                    setSubmitMessage("User created Successfully.");
                    SetShowMessage(true);
                    resetForm();
                }).catch(() => {
                    console.error("Mutation Error:", error);
                    setSubmitMessage("Something went wrong. Please try again.");
                    SetShowMessage(true);
                })
                .finally(() => {
                    setSubmitting(false);
                });
            }}
            >
                {({ isSubmitting }) => {
                    return (
                        <Form>
                            <div>
                                <label htmlFor="firstName">First Name:</label>
                                <Field type="text" name="firstName" id="firstName" className=""/>
                                <ErrorMessage name="firstName" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="lastName">First Name:</label>
                                <Field type="text" name="lastName" id="lastName" className=""/>
                                <ErrorMessage name="lastName" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="email">First Name:</label>
                                <Field type="text" name="email" id="email" className=""/>
                                <ErrorMessage name="email" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="gender">First Name:</label>
                                <Field type="text" name="gender" id="gender" className=""/>
                                <ErrorMessage name="gender" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="genderOther">First Name:</label>
                                <Field type="text" name="genderOther" id="genderOther" className=""/>
                                <ErrorMessage name="genderOther" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="ethnicity">First Name:</label>
                                <Field type="text" name="ethnicity" id="ethnicity" className=""/>
                                <ErrorMessage name="ethnicity" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="ethnicityOther">First Name:</label>
                                <Field type="text" name="ethnicityOther" id="ethnicityOther" className=""/>
                                <ErrorMessage name="ethnicityOther" component="div" className="" />
                            </div>

                            <div>
                                <label htmlFor="role">First Name:</label>
                                <Field type="text" name="role" id="role" className=""/>
                                <ErrorMessage name="role" component="div" className="" />
                            </div>

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    );
                }}
            </ Formik>
        </div>
    );
};

export default signup;
