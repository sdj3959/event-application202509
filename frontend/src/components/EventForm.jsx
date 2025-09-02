import styles from './EventForm.module.scss';
import {useNavigate, Form} from 'react-router-dom';

const EventForm = ({method, event={}}) => {

  // 새로고침 없이 페이지 이동
  const navigate = useNavigate();

  const { title, desc, 'img-url':image, 'start-date': date } = event;

  // yyyy년 MM월 dd일 ->  yyyy-MM-dd 로 변경
  const formatDate = (date) => {
    if (!date) return '';
    const [yearPart, monthDayPart] = date.split('년 ');
    const [monthPart, dayPart] = monthDayPart.split('월 ');

    return `${yearPart}-${monthPart}-${dayPart.replace('일', '')}`;

  };

  // route 설정에 있는 action 함수를 트리거 하려면 Form이라는 컴포넌트가 필요하다.
  // 필수 속성으로 method 속성을 지정해야 함.
  return (
    <Form
      method={method}
      className={styles.form}
      noValidate
      // onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? title : ''}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? image : ''}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? formatDate(date) : ''}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? desc : ''}
        />
      </p>
      <div className={styles.actions}>
        <button type='button' onClick={()=> navigate('..')}>Cancel</button>
        <button>{method === 'POST' ? 'Save' : 'Update'}</button>
      </div>
    </Form>
  );
};

export default EventForm;
