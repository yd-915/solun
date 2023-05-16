import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const ivLength = 16;

export async function encryptTransfer(message: string) {
    const iv = crypto.randomBytes(ivLength);
    const key = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted + ':' + key.toString('hex');
}
  
export async function decryptTransfer(message: string) {
    const components = message.split(':');
    // @ts-ignore: Works fine with it
    const iv = Buffer.from(components.shift(), 'hex');
    // @ts-ignore: Works fine with it
    const encryptedText = Buffer.from(components.shift(), 'hex');
    // @ts-ignore: Works fine with it
    const key = Buffer.from(components.shift(), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // @ts-ignore: Works fine with it
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    // @ts-ignore: Works fine with it
    decrypted += decipher.final('utf8');
    return decrypted;
}