// 이벤트를 등록하는 함수

import {redirect} from 'react-router-dom';
import {AUTH_API_URL, EVENT_API_URL} from '../config/host-config.js';

export const saveAction = async ({ request, params }) => {
  // console.log('save action!!');

  // form에 입력한 값 가져오기
  const formData = await request.formData();

  // 서버로 보낼 payload
  const payload = {
    title: formData.get('title'),
    desc: formData.get('description'),
    beginDate: formData.get('date'),
    imageUrl: formData.get('image')
  };

  let requestUrl = EVENT_API_URL;
  if (request.method === 'PUT') {
    requestUrl += `/${params.eventId}`;
  }

  const response = await fetch(requestUrl, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('이벤트 생성에 실패했습니다.');
  }

  // 목록페이지로 리다이렉트
  return redirect('/events');
};

// 삭제처리 액션 함수
export const deleteAction = async ({params}) => {
  if (!confirm('정말 삭제하시겠습니까?')) return;

  console.log('삭제 액션 함수 호출!');

  const res = await fetch(`${EVENT_API_URL}/${params.eventId}`, {
    method: 'DELETE'
  });

  return redirect('/events');
};

// 로그인 처리 액션함수
export const loginAction = async ({ request }) => {

  // 입력데이터 읽기
  const formData = await request.formData();

  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (response.status === 422) {
    // 서버에서 응답한 데이터를 컴포넌트에서 가져다 사용할 수 있게 데이터를 리턴.
    // 그럼 action함수를 처리하는 컴포넌트는 useActionData라는 훅으로 사용가능
    return data.message;
  }

  // 로그인에 성공했을 때 - 토큰을 저장
  localStorage.setItem('userData', JSON.stringify(data));

  return redirect('/');

};

// 로그아웃 처리 액션
export const logoutAction = () => {
  console.log('logout action');

  localStorage.removeItem('userData');

  // element가 없는 route path의 액션이나 로더함수는 반드시 redirect를 필수로 사용
  return redirect('/');
};