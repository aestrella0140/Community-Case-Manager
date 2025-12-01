import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import auth from "../utils/auth";

import { Link } from "react-router-dom";

const genderOptions = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
  "Other",
];
const ethnicityOptions = [
  "Hispanic or Latino",
  "Black or African American",
  "White",
  "Asian",
  "Native American or Alaska Native",
  "Native Hawaiian or Other Pacific Islander",
  "Middle Eastern or North African",
  "South Asian",
  "East Asian",
  "Southeast Asian",
  "Indigenous",
  "Multiracial",
  "Other",
  "Prefer not to say",
];

const Modal = ({ title, onClose, children }) => (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-content">
      <h3>{title}</h3>
      {children}
      <button
        type="button"
        className="custom-modal-close-btn"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const Signup = () => {
  const [addUser, { loading }] = useMutation(ADD_USER);
  const [submitMessage, setSubmitMessage] = React.useState(null);
  const [showMessage, SetShowMessage] = React.useState(false);

  const [showGenderModal, setShowGenderModal] = React.useState(false);
  const [showEthnicityModal, setShowEthnicityModal] = React.useState(false);

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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
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
              input: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                gender: values.gender,
                genderOther: values.genderOther,
                ethnicity: values.ethnicity,
                ethnicityOther: values.ethnicityOther,
                role: values.role,
              },
            },
          })
            .then(({ data, errors }) => {
              if (errors) {
                throw new Error("GraphQL error");
              }
              setSubmitMessage("User created Successfully.");
              SetShowMessage(true);
              auth.login(data.addUser.token);
            })
            .catch((error) => {
              console.error("Mutation Error:", error);
              setSubmitMessage("Something went wrong. Please try again.");
              SetShowMessage(true);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ values, handleChange, isSubmitting }) => {
          return (
            <>
              <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Form className="flex flex-col items-start w-5/12 gap-4">
                <h2 className="text-2xl font-semibold mb-4">Signup</h2>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col px-1">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name:
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="border border-gray-300 rounded px-2 py-2 w-[97%]"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>


                  <div className="flex flex-col px-1">
                    <label htmlFor="lastName">Last Name:</label>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="border border-gray-300 rounded px-2 py-2 w-[97%]"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                  <div className="flex flex-col flex-1 w-full ">
                    <label htmlFor="email">Email:</label>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                    <ErrorMessage name="email" component="div" className="" />
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <label htmlFor="password">Password:</label>
                    <Field
                      type="text"
                      name="password"
                      id="pwd"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </div>

                  <div className="flex flex-col flex-1 w-full ">
                    <label htmlFor="gender">Gender:</label>
                    <Field
                      as="select"
                      name="gender"
                      id="gender"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value === "Other") {
                          setShowGenderModal(true);
                        }
                      }}
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" component="div" className="" />
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <label htmlFor="ethnicity">Ethnicity:</label>
                    <Field
                      as="select"
                      name="ethnicity"
                      id="ethnicity"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value === "Other") {
                          setShowEthnicityModal(true);
                        }
                      }}
                    >
                      <option value="">Select Ethnicity</option>
                      {ethnicityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="ethnicity"
                      component="div"
                      className=""
                    />
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <label htmlFor="role">Role:</label>
                    <Field
                      type="text"
                      name="role"
                      id="role"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                    <ErrorMessage name="role" component="div" className="" />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              </div>

              {showGenderModal && (
                <Modal
                  title="Enter Gender"
                  onClose={() => setShowGenderModal(false)}
                >
                  <Field
                    type="text"
                    name="genderOther"
                    placeholder="Please specify you prefered gender"
                    className=""
                  />
                </Modal>
              )}

              {showEthnicityModal && (
                <Modal
                  title="Enter Ethnicity"
                  onClose={() => setShowEthnicityModal(false)}
                >
                  <Field
                    type="text"
                    name="ethnicityOther"
                    placeholder="Enter prefered Ethnicity"
                    className=""
                  />
                </Modal>
              )}
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
