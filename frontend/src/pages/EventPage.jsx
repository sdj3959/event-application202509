import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const EventPage = () => {

  const [eventList, setEventList] = useState([]);

  // API CALL
  const fetchEvents = async () => {
    const response = await fetch('http://localhost:9000/api/events');
    const data = await response.json();
    console.log(data);

    setEventList(data);
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <h1>Event Page</h1>
      <ul>
        {eventList.map(({eventId, title}) =>
          <li key={eventId}>
            <Link to={`/events/${eventId}`}>{title}</Link>
          </li>)}
      </ul>
    </>
  );
};

export default EventPage;