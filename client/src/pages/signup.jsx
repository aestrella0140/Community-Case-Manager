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
          })
            .then(({ data, errors }) => {
              if (errors) {
                throw new Error("GraphQL error");
              }
              setSubmitMessage("User created Successfully.");
              SetShowMessage(true);
              auth.login(data.addUser.token)
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
        {({ values, isSubmitting }) => {
          return (
            <>
              <Form>
                <div>
                  <label htmlFor="firstName">First Name:</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    className=""
                  />
                  <ErrorMessage name="firstName" component="div" className="" />
                </div>

                <div>
                  <label htmlFor="lastName">Last Name:</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    className=""
                  />
                  <ErrorMessage name="lastName" component="div" className="" />
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <Field type="text" name="email" id="email" className="" />
                  <ErrorMessage name="email" component="div" className="" />
                </div>

                <div>
                  <label htmlFor="password">Password:</label>
                  <Field type="text" name="password" id="pwd" className="" />
                  <ErrorMessage name="password" component="div" className="" />
                </div>

                <div>
                  <label htmlFor="gender">Gender:</label>
                  <Field
                    as="select"
                    name="gender"
                    id="gender"
                    onChange={(e) => {
                      const selected = e.target.value;
                      if (selected === "Other") {
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

                

                <div>
                  <label htmlFor="ethnicity">Ethnicity:</label>
                  <Field
                    as="select"
                    name="ethnicity"
                    id="ethnicity"
                    onChange={(e) => {
                      const selected = e.target.value;
                      if (selected === "Other") {
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
                  <ErrorMessage name="ethnicity" component="div" className="" />
                </div>

                <div>
                  <label htmlFor="role">Role:</label>
                  <Field type="text" name="role" id="role" className="" />
                  <ErrorMessage name="role" component="div" className="" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>

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
