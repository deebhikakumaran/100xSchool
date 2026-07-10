import { useState } from "react";
import Home from "./components/Home"
import AppBar from './components/AppBar';
import Login from './components/Login';

const StateLifting = () => {
    const [username, setUsername] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    function handleLogin(name) {
        if (!name) {
            return
        }
        setUsername(name)
        setIsLoggedIn(true)
    }
    
    function handleLogout() {
        setUsername('')
        setIsLoggedIn(false)
    }

    return (
        <div className="demo">
            <AppBar username={username} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main className="demo__body">
                {isLoggedIn ? <Home username={username} /> : <Login onLogin={handleLogin} />}
            </main>
        </div>
    )
}

export default StateLifting