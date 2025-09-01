import React, {useEffect, useState} from 'react';
import {useLoaderData, useParams} from "react-router-dom";

// /events/:id
const EventDetailPage = () => {

  const {eventId} = useParams();

  const detailEvent = useLoaderData();

  return (
    <>
      <h1>Event Detail Page</h1>
      <p>Event Id: {eventId}</p>
      <p>Event Title: {detailEvent?.title}</p>
      <p>Event Title: {detailEvent?.desc}</p>
    </>
  );
};

export default EventDetailPage;