'use client'

import Link from "next/link"

const Dashboard = () => {
    return(
        <div>
            <h1>Dashboard</h1>
            <Link href={'/dashboard/user'}>User</Link>
            <Link href={'/dashboard/category'}>Category</Link>
        </div>
        
    )
}

export default Dashboard