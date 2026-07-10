import { useContext } from "react"
import { useState } from 'react'
import {AuthContext} from "../context/AuthContextProvider"

const LoginContext = () => {
    const {handleLogin} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    
    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(username)
        setUsername('') 
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <label className="login__label" htmlFor="username">
                username
            </label>
            <input
                id="username"
                className="login__input"
                type="text"
                value={username}
                placeholder='enter username'
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="login__submit" type="submit">
                log in →
            </button>
        </form>
    )
}

export default LoginContext