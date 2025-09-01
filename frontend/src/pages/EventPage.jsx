import React, {useEffect, useState} from 'react';

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
        {eventList.map(event => <li key={event.id}>{event.title}</li>)}
      </ul>
    </>
  );
};

export default EventPage;