
// 토큰이 자동 포함된 fetch함수
import {getUserToken} from '../loader/events-loader.js';

export const fetchWithAuth = async (url, method='GET', payload=null) => {

  const token = getUserToken();

  // 요청 옵션 설정
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  // 서버로 보낼데이터가 있고, GET요청이 아니라면
  if (payload && method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  return await fetch(url, options);
};