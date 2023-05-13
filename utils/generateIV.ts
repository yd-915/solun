import crypto from 'crypto';

export async function generateIV(){
    try {
        const iv = crypto.randomBytes(16);
        return iv;
    } catch (err) {
        return {
            message: "An error occurred while generating the IV, please try again",
        };
    }
}

export default generateIV;