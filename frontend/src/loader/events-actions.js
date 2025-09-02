// 이벤트를 등록하는 함수

import {redirect} from 'react-router-dom';

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

  let requestUrl = 'http://localhost:9000/api/events';

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

  const res = await fetch(`http://localhost:9000/api/events/${params.eventId}`, {
    method: 'DELETE',
  });

  return redirect('/events');
};