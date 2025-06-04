import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import type { ICamper } from '../../types';
import Loader from '../Loader/Loader';
import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './CamperDetails.module.scss';

import IconRating from '@/assets/icons/icon-rating.svg?react';
import IconMap from '@/assets/icons/icon-map.svg?react';
import CamperFeatures from '../CamperFeatures/CamperFeature';

const CamperDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [camper, setCamper] = useState<ICamper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [date, setDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);
  const [message, setMessage] = useState('');
  const [isMessageValid] = useState(true);

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        const data = await res.json();
        setCamper(data);
      } catch (error) {
        console.error('Failed to fetch camper', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCamper();
    }
  }, [id]);

  const onSubmit = () => {
    if (name && isNameValid && email && isEmailValid && date && isDateValid && isMessageValid) {
      alert('You have successfully booked a campervan. We will contact you shortly.');
      setName('');
      setIsNameValid(true);
      setEmail('');
      setIsEmailValid(true);
      setDate('');
      setIsDateValid(true);
      setMessage('');
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (!camper) {
    return <div className={styles.error}>Camper not found.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{camper.name}</h1>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <IconRating />
            <span>{camper.rating.toFixed(1)} ({camper.reviews.length} Reviews)</span>
          </div>
          <div className={styles.location}>
            <IconMap />
            {camper.location}
          </div>
        </div>
        <div className={styles.price}>€{camper.price.toFixed(2)}</div>
      </div>

      <div className={styles.gallery}>
        {camper.gallery.map((img, i) => (
          <div key={i} className={styles.galleryItem}>
            <img src={img.thumb} alt={`gallery-${i}`} />
          </div>
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <div
          className={classNames(styles.tab, { [styles.activeTab]: activeTab === 'features' })}
          onClick={() => setActiveTab('features')}
        >
          Features
        </div>
        <div
          className={classNames(styles.tab, { [styles.activeTab]: activeTab === 'reviews' })}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </div>
      </div>

      <div className={styles.tabContentWrapper}>
        <div className={styles.tabContent}>
          {activeTab === 'features' ? (
            <div className={styles.featuresTab}>
              <CamperFeatures camper={camper} />

              <div className={styles.vehicleDetails}>
                <h4>Vehicle details</h4>
                <div className={styles.line} />
                <table>
                  <tbody>
                    <tr>
                      <td>Form</td>
                      <td>{camper.form.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
                    </tr>
                    <tr>
                      <td>Length</td>
                      <td>{camper.length}</td>
                    </tr>
                    <tr>
                      <td>Width</td>
                      <td>{camper.width}</td>
                    </tr>
                    <tr>
                      <td>Height</td>
                      <td>{camper.height}</td>
                    </tr>
                    <tr>
                      <td>Tank</td>
                      <td>{camper.tank}</td>
                    </tr>
                    <tr>
                      <td>Consumption</td>
                      <td>{camper.consumption}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.reviewsTab}>
              {camper.reviews.map((review, idx) => (
                <div key={idx} className={styles.reviewItem}>
                  <div className={styles.top}>
                    <div className={styles.avatar}>{review.reviewer_name[0]}</div>
                    <div className={styles.reviewContent}>
                      <div className={styles.name}>{review.reviewer_name}</div>
                      <div className={styles.stars}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={classNames(styles.star, {
                              [styles.active]: index < review.reviewer_rating,
                            })}
                          >
                            <IconRating />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.booking}>
          <h3>Book your campervan now</h3>
          <p>Stay connected! We are always ready to help you.</p>

          <div className={styles.inputs}>
            <Input
              type="text"
              placeholder="Name*"
              value={name}
              onChange={(val) => {
                setName(val);
                setIsNameValid(val.trim().length > 2);
              }}
              isValid={isNameValid}
            />
            <Input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(val) => {
                setEmail(val);
                setIsEmailValid(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val));
              }}
              isValid={isEmailValid}
            />
            <Input
              type="calendar"
              placeholder="Booking date*"
              value={date}
              onChange={(val) => {
                setDate(val);
                setIsDateValid(Boolean(val));
              }}
              isValid={isDateValid}
            />
            <Input
              type="textarea"
              placeholder="Comment"
              value={message}
              onChange={(val) => {
                setMessage(val);
              }}
              isValid={isMessageValid}
            />
          </div>

          <div className={styles.button}>
            <Button
              onClick={onSubmit}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetails;