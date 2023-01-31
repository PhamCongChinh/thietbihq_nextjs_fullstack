'use client'

import Link from "next/link"

const User = () => {
    return(
        <div>
            <h1>User</h1>
            <Link href={'/dashboard'}>Dashboard</Link>
        </div>
        
    )
}

export default User