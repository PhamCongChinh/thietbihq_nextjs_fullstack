import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

export async function signAccessToken(payload: string, secret: string): Promise<string>{
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 10 // expired access token
    return new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
}
export async function signRefreshToken(payload: string, secret: string): Promise<string>{
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 30 // expired refresh token
    return new SignJWT({ payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret))
}
export async function verify(token: string, secret: string): Promise<JWTPayload>{
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(secret))
        return verified.payload as JWTPayload
    } catch (error) {
        throw new Error('Your token has expired')
    }
}