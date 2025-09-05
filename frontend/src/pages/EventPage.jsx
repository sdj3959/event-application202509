import React, {useEffect, useRef, useState} from 'react';
import EventList from '../components/EventList.jsx';
import EventSkeleton from '../components/EventSkeleton.jsx';
import {EVENT_API_URL} from '../config/host-config.js';
import {getUserToken} from '../loader/events-loader.js';
import {fetchWithAuth} from '../config/api.js';

const EventPage = () => {

  // 감시대상 태그 연결
  const observerRef = useRef();

  const [eventList, setEventList] = useState([]);

  // 현재 페이지번호
  const [currentPage, setCurrentPage] = useState(1);

  // 더 이상 가져올 데이터가 있는지 여부
  const [isFinish, setIsFinish] = useState(false);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(false);


  const fetchEvents = async () => {

    if (isFinish || loading) return;

    setLoading(true);

    // 강제로 1.5초의 로딩 부여
    await new Promise(r => setTimeout(r, 1500));

    const response = await fetchWithAuth(`${EVENT_API_URL}?page=${currentPage}`);
    const {hasNext, eventList: events} = await response.json();
    setEventList(prev => [...prev, ...events]);
    // 페이지번호 갱신
    setCurrentPage(prev => prev + 1);
    setIsFinish(!hasNext);

    setLoading(false);
  };

  useEffect(() => {

    // 무한스크롤을 위한 옵저버 생성
    const observer = new IntersectionObserver((entries) => {

      if (isFinish || loading) return;

      if (entries[0].isIntersecting) {
        // console.log('감시대상 발견!');
        fetchEvents();
      }
    }, {
      // 관찰하고 있는 대상의 높이가 50%정도 보일 때 감지 실행
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
      {/* 무한스크롤 옵저버를 위한 감시대상 태그  */}
      <div ref={observerRef} style={{ height: 100 }}>
        {/* 로딩바, 스켈레톤 폴백 배치 */}
        {loading && <EventSkeleton/>}
      </div>
    </>
  );
};

export default EventPage;