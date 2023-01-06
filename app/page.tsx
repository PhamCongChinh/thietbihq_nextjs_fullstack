import { Inter } from '@next/font/google'

//const inter = Inter({ subsets: ['latin'] })
import { cookies } from 'next/headers'

export default function Home() {
    const nextCookies = cookies()
    const accessToken = nextCookies.get('accessToken')
    console.log("accessToken Home", accessToken)
    return (
        <main>
            <div>
                <p>
                    Get started by editing&nbsp;
                    <code>app/page.tsx</code>
                </p>
            </div>
        </main>
    )
}
