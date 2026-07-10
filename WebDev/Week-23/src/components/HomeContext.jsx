import { useContext } from "react"
import {AuthContext} from "../context/AuthContextProvider"

const HomeContext = () => {
    const {username} = useContext(AuthContext)
    return (
        <div className="home" style={{display: "flex", flexDirection: "column"}}>
            <div className="home__line" style={{margin: "20px"}}>welcome to auth system demo</div>
            <div className="home__line home__line--result" style={{margin: "10px", paddingLeft: "60px"}}>{username}</div>
        </div>
    )
}

export default HomeContext




