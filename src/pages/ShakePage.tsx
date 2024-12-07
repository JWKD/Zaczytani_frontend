import ShakeForm from '../components/ShakeForm/ShakeForm';
import AfterShakeForm from '../components/AfterShakeForm/AfterShakeForm';
import { useEffect, useState } from 'react';
import dataApi from '../api/bookApi';
import { Book } from '../interfaces/book';
import { AxiosError } from 'axios';

function ShakePage() {
  const [myBook, setBook] = useState<Book>();
  const [isShaking, setIsShaking] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.gethasDrawn();
        setBook(result);
        setIsShaking(true);
      } catch (err) {
        const error = err as AxiosError;
        if (error.status === 404) {
          setIsShaking(false);
        } else {
          setError('Wystąpił błąd');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : isShaking ? (
    <AfterShakeForm book={myBook} />
  ) : (
    <ShakeForm />
  );
}

export default ShakePage;
