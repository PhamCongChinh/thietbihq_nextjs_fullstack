"use client"
import instance from '../../config/axiosConfig'

export default function Login() {
    const handleSubmit = async (event:any) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('username', event.target.username.value)
        formData.append('password', event.target.password.value)

        await instance.post('/api/auth/login', formData)
        /*await fetch('/api/auth/login', {
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });*/
    }
    return (
        <div>
            <h1>Login</h1>
            <form id="form" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="">Username</label>
                    <input type={'text'} name="username" placeholder="Nhập 6-20 ký tự" autoFocus />
                </p>
                <p>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" id="" />
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
