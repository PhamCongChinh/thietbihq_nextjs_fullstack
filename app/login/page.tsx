'use client'

import axios from "axios"
import { useRouter } from "next/navigation"

const Login = () => {

    const router = useRouter()
    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const formData = new FormData()
        
        formData.append('username', event.target.username.value)
        formData.append('password', event.target.password.value)

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/auth/login',
                data: formData,
                headers: { 'Content-Type': 'application/json; multipart/form-data' }
            })
            .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    router.push('/dashboard')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form id="form" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="">Username</label>
                <input type={'text'} name="username" placeholder="Nhập 6-20 ký tự" autoFocus />
            </p>
            <p>
                <label htmlFor="">Password</label>
                <input type={'password'} name="password" id="" />
            </p>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login