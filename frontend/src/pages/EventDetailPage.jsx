import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

// /events/:id
const EventDetailPage = () => {

  const {eventId} = useParams();

  const [detailEvent, setDetailEvent] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:9000/api/events/${eventId}`);
      const data = await response.json();
      setDetailEvent(data);
    })();
  }, []);

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