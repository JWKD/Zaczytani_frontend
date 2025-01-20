import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmEmail() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const userId = queryParams.get('userId');
  const code = queryParams.get('code');

  useEffect(() => {
    // wysłać request na confirmEmail. potrzebne tylko userId i code
    // jeżeli się powiedzie to wyświetlić stronę potwierdzającą potwierdzenie maila i dodac przycisk do strony logowania
    // jeżeli się nie powiedzie to wyświetlić błąd
  }, []);

  return (
    <h1>
      code: {code}, userId: {userId}
    </h1>
  );
}

export default ConfirmEmail;
