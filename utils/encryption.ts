import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const ivLength = 16;

export async function encrypt(message: string, key: string) {
  const iv = crypto.randomBytes(ivLength);
  const keyBuffer = Buffer.from(key, 'hex'); // Konvertiere den Schlüssel in einen Buffer
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
  const keyBuffer = Buffer.from(key, 'hex'); // Konvertiere den Schlüssel in einen Buffer
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  // @ts-ignore: Works fine with it
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  // @ts-ignore: Works fine with it
  decrypted += decipher.final('utf8');
  return decrypted;
}