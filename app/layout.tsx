import Link from 'next/link'

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
                <Link href="/">Home</Link>{' '}
                <Link href="/login">Login</Link>{' '}
                <Link href="/dashboard">Dashboard</Link>
                {children}
            </body>
        </html>
    )
}
