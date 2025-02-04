import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import userApi from '../api/userApi';
import ConfirmedEmail from '../components/ConfirmedEmail.tsx/ConfirmedEmail';
import CatLoader from '../components/CatLoader/CatLoader';

function ConfirmEmail() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);

  const userId = queryParams.get('userId');
  const code = queryParams.get('code');

  const postData = async () => {
    if (userId && code) {
      try {
        const payload = {
          userId: userId,
          code: code,
        };
        await userApi.confirmEmail(payload);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    postData();
  }, [loading]);

  return loading ? (
    <div
      style={{
        width: '500px',
        margin: '0 auto',
      }}
    >
      <CatLoader />
    </div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div>
      <ConfirmedEmail />
    </div>
  );
}

export default ConfirmEmail;
