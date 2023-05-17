import { randomBytes } from 'crypto';

const generatePassword = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?';
  const randomBytesArray = randomBytes(length);

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytesArray[i] % charset.length;
    password += charset[randomIndex];
  }

  return password;
};

export default generatePassword;