import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
