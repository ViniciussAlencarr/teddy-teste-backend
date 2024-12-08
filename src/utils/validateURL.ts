import validator from 'validator';

export const validateUrl = (url: string): boolean => {
    return validator.isURL(url, {
        protocols: ['http', 'https'],
        require_protocol: true,
    });
}