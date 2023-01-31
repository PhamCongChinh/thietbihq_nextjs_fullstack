import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import pool from './config/database'
import { signAccessToken, verify } from './helpers/jwtSignVerify'

let cookie = require('cookie')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

export async function middleware(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken')?.value
    console.log(accessToken)
    
    let check = false
    const verifiedToken = accessToken && (await verify(accessToken as string, accessTokenSecret as string)
    .catch((err) => {
        console.log("err: ", err)
        check = true
    }))
    
    console.log("verifiedToken: ", verifiedToken)
    console.log("!verifiedToken: ", !verifiedToken)
    console.log("check: ", check)
    const response = NextResponse.next()
    if (check) {
        console.log("Refresh token is used here")
        //const payload = JSON.parse(JSON.stringify(verifiedRefreshToken)).payload
        //await pool.query(`SELECT * FROM user`)
        const newAccessToken = await signAccessToken('admin', accessTokenSecret as string)
        const serialised = cookie.serialize('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/"
        });
        response.headers.set('Set-Cookie', serialised)
        return response
    }

    if (request.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
        return
    }

    if (request.url.includes('/login') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/login',
        '/dashboard',
        '/dashboard/:path*'
    ],
}