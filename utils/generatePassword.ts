import { randomBytes } from 'crypto';

const generatePassword = (length: number): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?';
  const charsetLength = charset.length;
  const maxValidByte = 256 - (256 % charsetLength);

  let password = '';
  while (password.length < length) {
    const randomBytesArray = randomBytes(length);
    for (let i = 0; i < randomBytesArray.length && password.length < length; i++) {
      const randomByte = randomBytesArray[i];
      if (randomByte < maxValidByte) {
        const randomIndex = randomByte % charsetLength;
        password += charset[randomIndex];
      }
    }
  }

  return password;
};

export default generatePassword;