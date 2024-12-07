import ShakeForm from '../components/ShakeForm/ShakeForm';
import AfterShakeForm from '../components/AfterShakeForm/AfterShakeForm';
import { useEffect, useState } from 'react';
import dataApi from '../api/bookApi';
import { Book } from '../interfaces/book';

function ShakePage() {
  const [myBook, setBook] = useState<Book>();
  const [isShaking, setIsShaking] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.gethasDrawn();
        setBook(result);
        setIsShaking(true);
      } catch (err) {
        setIsShaking(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? <div>Loading ...</div> : isShaking ? <AfterShakeForm book={myBook} /> : <ShakeForm />;
}

export default ShakePage;
