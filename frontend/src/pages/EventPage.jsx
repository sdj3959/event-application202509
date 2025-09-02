import React, {useEffect, useState} from 'react';
import EventList from '../components/EventList.jsx';

const EventPage = () => {

  const [eventList, setEventList] = useState([]);

  useEffect(() => {

    (async () => {
      const response = await fetch('http://localhost:9000/api/events?page=1');
      const { hasNext, eventList: events } = await response.json();
      setEventList(events);
    })();

  }, []);



  return (
    <EventList eventList={eventList} />
  );
};

export default EventPage;