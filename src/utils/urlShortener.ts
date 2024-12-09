import crypto from 'crypto'

export const urlShortener = (originalUrl: string) => {
    const code = crypto.randomBytes(3).toString('hex').slice(0, 6);
    const shortenedUrl = process.env.NODE_ENV === 'production' ? `http://localhost:3131/${code}` : `http://localhost:3131/${code}`

    return { shortenedUrl, code }
}