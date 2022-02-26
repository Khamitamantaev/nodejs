import { useState } from "react"
import axios from "axios"
import cookie from 'js-cookie'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.post(
            `/api/login`, 
            { email, password }, 
            config
        )
        cookie.set('token', data.token)
        cookie.set('user', data.user )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Register