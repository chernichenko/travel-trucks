import { useState } from 'react';
import Input from '../../components/Input/Input';

import styles from './Home.module.scss';

const Home = () => {
  const [text, setText] = useState('');
  const [isTextValid, setIsTextValid] = useState(true);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [date, setDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);

  const [message, setMessage] = useState('');
  const [isMessageValid] = useState(true);

  return (
    <div className={styles.wrap}>
      <Input
        type="text"
        placeholder="Enter your name"
        value={text}
        onChange={(val) => {
          setText(val);
          setIsTextValid(val.trim().length > 2);
        }}
        isValid={isTextValid}
      />

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(val) => {
          setEmail(val);
          setIsEmailValid(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val));
        }}
        isValid={isEmailValid}
      />

      <Input
        type="calendar"
        placeholder="Select a date"
        value={date}
        onChange={(val) => {
          setDate(val);
          setIsDateValid(Boolean(val));
        }}
        isValid={isDateValid}
      />

      <Input
        type="textarea"
        placeholder="Write a message"
        value={message}
        onChange={(val) => {
          setMessage(val);
        }}
        isValid={isMessageValid}
      />
    </div>
  );
};

export default Home;