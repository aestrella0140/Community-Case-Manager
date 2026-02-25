import React from "react";
import { Formik, Form, Field, ErrorMessage }  from "formik";
import * as Yup from "yup";

import { useMutation } from "@apollo/client";
import { ADD_CASE } from "../utils/mutations";
import auth from "../utils/auth";

const newCase = () => {
    const [newCase, { loading }] = useMutation(ADD_CASE); 
    const [submitMessage, setSubmitMessage] = React.useState(null);
    const [showMessage, SetShowMessage] = React.useState(false);
    
    const caseValidationSchema = Yup.object().shape({
        firstName: Yup.string().required("firstName of client or representative is required."),
        lastName: Yup.string().required("lastName of client or representative is required."),
        dob: Yup.string().required("date of birth is required."),
    })

}