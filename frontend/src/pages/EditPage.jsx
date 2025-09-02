import React from 'react';
import EventForm from "../components/EventForm.jsx";
import {useLoaderData} from "react-router-dom";

const EditPage = () => {

  const event = useLoaderData();

  return (
    <EventForm method='PUT' event={event} />
  );
};

export default EditPage;