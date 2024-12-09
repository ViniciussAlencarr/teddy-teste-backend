import jwt from 'jsonwebtoken';

const privateKey = process.env.PB_OPENSSL_KEY as string;

export const validateToken = async (token: string) => {
    try {
        return jwt.verify(token, privateKey)
    } catch (err) {
        return false
    }
}

export const sign = async (payload: any) => {
    // return jwt.sign(payload, privateKey, { expiresIn: '5m' })
    return jwt.sign(payload, privateKey)
}

export const decodeJwt = async (token: string) => {
    try {
        const decoded = jwt.decode(token);

        // TODO: adicionar validações adicionais conforme necessario
        return decoded
    } catch (error) {
        return true;
    }
}