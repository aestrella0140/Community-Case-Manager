import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import { GET_USER_BY_ID, GET_CASE_BY_ID } from "../utils/queries";

const Dashboard = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    
    const formattedDate = currentDate.format('DD MMMM YYYY');

  const user = auth.getUser();
  const userId = user?.data?._id;

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { getUserByIdId: userId },
    skip: !userId,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    navigate("/login");
  };

  if (loading) return <p>loading</p>;

  if (error) {
    console.error(error);
    return <p>Error loading</p>;
  }

  const { firstName, lastName } = data.getUserById;

  return (
    <>
      <header>
        <h1>Welcome back, {firstName} {lastName} {formattedDate}</h1>
        <button onClick={handleLogout}>logout</button>
      </header>

      <main>
        <section>
            <h2>Dashboard overview</h2>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
