// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RowDataPacket } from 'mysql2'
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../config/database'
import { signAccessToken, signRefreshToken, verify } from '../../../helpers/jwtSignVerify'
let cookie = require('cookie')

type Data = {
    message: string
}

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { username, password } = JSON.parse(req.body)
    if (username === 'admin') {
        const accessToken = await signAccessToken(username, accessTokenSecret as string)
        const serialised = cookie.serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 10,
            path: "/"
        });

        const [refreshTokenDB] = await pool.query(`SELECT refreshToken FROM user WHERE username = '`+ username+`'`)
        const refreshTokenDatabase = (refreshTokenDB as RowDataPacket[])[0].refreshToken
        
        if (refreshTokenDatabase === null) {
            const refreshToken = await signRefreshToken(username, refreshTokenSecret as string)
            await pool.query(`UPDATE user SET refreshToken ='` + refreshToken +`' WHERE username = '`+ username +`'`)
            console.log('Updated successful')
        }else{
            console.log('Refreshtoken đã tồn tại!')
            await verify(refreshTokenDatabase, refreshTokenSecret as string)
            .catch( async() => {
                const refreshToken1 = await signRefreshToken(username, refreshTokenSecret as string)
                await pool.query(`UPDATE user SET refreshToken ='` + refreshToken1 +`' WHERE username = '`+ username +`'`)
            })
        }
        res.setHeader('Set-Cookie', serialised)
        return res.status(200).json({message: 'Login thanh cong'})
    }else{
        return res.status(404).json({message: 'Login that bai'})
    }
}
