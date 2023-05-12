import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export async function decryptData(encryptedDataHex: string, key: string) {
    const encryptedBuffer = Buffer.from(encryptedDataHex, 'hex');
    const components = encryptedBuffer.toString().split(':');
    // @ts-ignore: Works fine with it
    const iv = Buffer.from(components.shift(), 'hex');
    const encryptedData = Buffer.from(components.join(':'), 'hex');
    const keyBuffer = Buffer.from(key, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return decryptedBuffer;
  }
  