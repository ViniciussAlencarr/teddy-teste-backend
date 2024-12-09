import argon2 from 'argon2'

export async function comparePassword(hash: string, password: Buffer | string) {
    return argon2.verify(hash, password)
}

export async function hash(password: Buffer | string) {
    return argon2.hash(password)
} 