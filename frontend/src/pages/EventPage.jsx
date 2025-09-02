import React, {useEffect, useRef, useState} from 'react';
import EventList from '../components/EventList.jsx';

const EventPage = () => {

  const observerRef = useRef();

  const [eventList, setEventList] = useState([]);

  // 현재 페이지번호
  const [currentPage, setCurrentPage] = useState(1);

  // 더 이상 가져올 데이터가 있는지 여부
  const [isFinish, setIsFinish] = useState(false);

  const fetchEvents = async () => {

    if (isFinish) return;

    const response = await fetch(`http://localhost:9000/api/events?page=${currentPage}`);
    const { hasNext, eventList: events } = await response.json();
    setEventList(prev => [...prev, ...events]);
    // 페이지번호 갱신
    setCurrentPage(prev => prev + 1);
    setIsFinish(!hasNext);
  }

  useEffect(() => {

    // 무한스크롤을 위한 옵저버 생성
    const observer = new IntersectionObserver((entries) => {

      if (isFinish) return;

      if (entries[0].isIntersecting) {
        // console.log('감시대상 발견!');
        fetchEvents();
      }
    }, {
      // 관찰하고 있는 대상의 높이가 50% 이상 보일 때 감지 실행
      threshold: 0.5
    });

    // 감시 대상 설정
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();

  }, [currentPage]);



  return (
    <>
      <EventList eventList={eventList} />
      {/* 무한스크롤 옵저버를 위한 감시대상 태그 */}
      <div ref={observerRef} style={{height: 300, background:'yellow'}}>
        {/* 로딩바, 스켈레톤 폴백 배치 */}
      </div>
    </>
  );
};

export default EventPage;