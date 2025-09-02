import styles from './EventItem.module.scss';
import {Link, useNavigate} from "react-router-dom";

const EventItem = ({ event }) => {

  const navigate = useNavigate();

  const {
    id,
    title,
    desc: description,
    'img-url': image,
    'start-date': date,
  } = event;

  const deleteHandler = e => {
    e.preventDefault();

    // 서버에 POST 요청
    (async () => {
      const response = await fetch(`http://localhost:9000/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 목록 페이지로 리다이렉트
        navigate('/events');
      }

    })();
  }

  return (
    <article className={styles.event}>
      <img
        src={image}
        alt={title}
      />
      <h1>{title}</h1>
      <time>{date}</time>
      <p>{description}</p>
      <menu className={styles.actions}>
        <Link to={`edit`}>Edit</Link>
        <button onClick={deleteHandler}>Delete</button>
      </menu>
    </article>
  );
};

export default EventItem;
