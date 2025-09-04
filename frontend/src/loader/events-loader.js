import {EVENT_API_URL} from '../config/host-config.js';

export const eventListLoader = async () => {
  const response = await fetch(`${EVENT_API_URL}?page=1`);

  // loader가 리턴한 데이터는 라우팅된 페이지와 그 하위 컴포넌트에서 언제든 사용가능
  // loader는 fetch결과를 바로 리턴하는 경우 알아서 json을 추출한다.
  // return await response.json();
  return response;
}

export const eventDetailLoader = async ({ params }) => {

  return await fetch(`${EVENT_API_URL}/${params.eventId}`);
}

// 로컬스토리지에 있는 토큰데이터를 불러오는 로더
export const userDataLoader = () => JSON.parse(localStorage.getItem('userData'));