import React from 'react';
import {useLoaderData} from 'react-router-dom';
import EventList from '../components/EventList.jsx';

const EventPage = () => {

  // loader가 리턴한 데이터 가져오기
  const eventList = useLoaderData();

  return (
    <EventList eventList={eventList} />
  );
};

export default EventPage;