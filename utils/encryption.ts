import crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

const algorithm = 'aes-256-cbc';
const ivLength = 16;

export async function encrypt(message: string, key: string) {
  const iv = crypto.randomBytes(ivLength);
  const keyBuffer = Buffer.from(key, 'hex');
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export async function decrypt(message: string, key: string) {
  const components = message.split(':');
  // @ts-ignore: Works fine with it
  const iv = Buffer.from(components.shift(), 'hex');
  const encryptedText = Buffer.from(components.join(':'), 'hex');
  const keyBuffer = Buffer.from(key, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  // @ts-ignore: Works fine with it
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  // @ts-ignore: Works fine with it
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function encryptFile(path: string, key: string, iv: Buffer) {
  const keyBuffer = Buffer.from(key, 'hex');
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
  const fileBuffer = readFileSync(path);
  const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  
  writeFileSync(path, encryptedBuffer);
}

export async function decryptFile(path: string, key: string, iv: string) {
  const keyBuffer = Buffer.from(key, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedData = readFileSync(path);
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
  const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  
  writeFileSync(path, decryptedData);
}

export async function decryptFileData(fileData: any, key: string, iv: string) {
  try {
    const keyBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);

    const decryptedData = Buffer.concat([decipher.update(Buffer.from(fileData, 'binary')), decipher.final()]);

    return decryptedData;
  } catch (err) {
    return {
      message: "An error occurred while decrypting the file, please try again",
    };
  }
}