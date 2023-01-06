import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from './helpers/jwtSignVerify'

const accessTokenSecret = process.env.TOKEN_SECRET || "token"

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const accessToken = request.cookies.get('accessToken')?.value
    console.log(accessToken)
    if (accessToken) {
        const { payload } = await verify(accessToken, accessTokenSecret)
        console.log(payload)
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*'
    ],
}

/**
 * const legacyPrefixes = ['/dashboard']
 * if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
        return NextResponse.rewrite(new URL('/login', request.url))
    }
 */