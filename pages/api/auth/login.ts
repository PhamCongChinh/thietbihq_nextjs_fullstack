import type { NextApiRequest, NextApiResponse } from 'next'
import { signAccessToken } from '../../../helpers/jwtSignVerify'

var cookie = require('cookie')

type Data = {
    message: string
}

const accessTokenSecret = process.env.TOKEN_SECRET || "token"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { username, password } = JSON.parse(req.body)
    console.log(JSON.parse(req.body))
    if (username === 'admin') {
        const accessToken = await signAccessToken(username, accessTokenSecret)
        const serialised = cookie.serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/"
        })
        res.setHeader('Set-Cookie', serialised)
    }
    res.status(200).json({ message: 'Successful' })
}
