//import './globals.css'

import Link from "next/link"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <div>
                    <Link href={'/'}>Home</Link>{' '}
                    <Link href={'/login'}>Login</Link>
                </div>
                {children}
            </body>
        </html>
    )
}
