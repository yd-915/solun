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

export async function encryptFile(path: string, key: string) {
  const iv = crypto.randomBytes(ivLength);
  const keyBuffer = Buffer.from(key, 'hex');
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
  const fileBuffer = readFileSync(path);
  const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  writeFileSync(path, iv.toString('hex') + ':' + encryptedBuffer.toString('hex'));
}

export async function decryptFile(path: string, key: string) {
  // @ts-ignore: Works fine with it
  const encryptedBuffer = Buffer.from(readFileSync(path), 'hex');
  const components = encryptedBuffer.toString().split(':');
  // @ts-ignore: Works fine with it
  const iv = Buffer.from(components.shift(), 'hex');
  const encryptedData = Buffer.from(components.join(':'), 'hex');
  const keyBuffer = Buffer.from(key, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  const decryptedBuffer = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  writeFileSync(path, decryptedBuffer);
}