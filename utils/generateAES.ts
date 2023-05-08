import crypto from 'crypto';

export async function generateAES(){
    try {
        const key = crypto.randomBytes(32).toString('hex');
        return key;
    } catch (err) {
        return {
            message: "An error occurred while generating the AES key, please try again",
        };
    }
}

export default generateAES;