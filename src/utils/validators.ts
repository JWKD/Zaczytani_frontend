export const validatePassword = (password: string, confirmPassword: string) => {
  const newErrors: { [key: string]: string } = {};
  if (password !== confirmPassword) {
    newErrors.different = 'Upewnij się czy hasła są takie same!';
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password) ||
    !/\d/.test(password) ||
    !/[a-z]/.test(password) ||
    password.length < 6
  ) {
    newErrors.password = `Hasło musi składać się conajmniej z 6 znaków i zawierać małą literę, wielką literę, cyfrę i znak specjalny`;
  }
  return {
    isValid: Object.keys(newErrors).length === 0,
    newErrors,
  };
};

export const validateEmail = (email: string) => {
  const newErrors: { [key: string]: string } = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = `Wpisz poprawny adres e-mail!`;
  }
  return {
    isValid: Object.keys(newErrors).length === 0,
    newErrors,
  };
};
