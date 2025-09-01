import styles from './EventForm.module.scss';
import {useNavigate} from 'react-router-dom';

const EventForm = () => {

  // 새로고침 없이 페이지 이동
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // form에 입력한 값 가져오기
    const formData = new FormData(e.target);

    // 서버로 보낼 payload
    const payload = {
      title: formData.get('title'),
      desc: formData.get('description'),
      beginDate: formData.get('date'),
      imageUrl: formData.get('image')
    };
    // console.log(payload);

    // 서버에 POST 요청
    (async () => {
      const response = await fetch('http://localhost:9000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // 목록 페이지로 리다이렉트
        navigate('/events');
      }

    })();
  };

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
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
        <button type='button'>Cancel</button>
        <button>Save</button>
      </div>
    </form>
  );
};

export default EventForm;
