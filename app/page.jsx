import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main>
            <div >
                <h1 className="text-3xl font-bold text-center">
                    Next.js 13
                </h1>
            </div>
        </main>
    )
}
