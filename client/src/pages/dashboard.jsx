import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../utils/auth";

import { GET_USER_BY_ID, GET_CASE_BY_ID } from "../utils/queries";

const Dashboard = ({userId}) => {
const {loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
});

if (loading || error) return <p>loading data</p>

const { firstName, lastName } = data.getUserById

    return (
        <header>
            <h1>
                {firstName}{lastName}
            </h1>
        </header>
    )
};

export default Dashboard;
