import { useLocation } from 'react-router-dom';

function ResetPassword() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const resetCode = queryParams.get('resetCode');
  const email = queryParams.get('email');
  return (
    <h1>
      email: {email}, Code: {resetCode}
    </h1>
  );
}

export default ResetPassword;
