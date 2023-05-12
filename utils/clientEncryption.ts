import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// @TODO Doesnt work index.js:7 Uncaught (in promise) TypeError: The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type undefined

export async function decryptData(encryptedData: string, key: string) {
  const [ivHex, encryptedDataHex] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedDataHex, 'hex');
  const keyBuffer = Buffer.from(key, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
  return decryptedBuffer;
}