import styles from './EventForm.module.scss';
import {useNavigate, Form} from 'react-router-dom';

const EventForm = ({method}) => {

  // 새로고침 없이 페이지 이동
  const navigate = useNavigate();

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
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
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
