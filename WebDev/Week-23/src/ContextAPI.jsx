import HomeContext from "./components/HomeContext"
import LoginContext from "./components/LoginContext"
import AppBarContext from "./components/AppBarContext"
import AuthContextProvider, {AuthContext} from "./context/AuthContextProvider"
import { useContext } from "react"

function ContextAPIScreen() {
  const { isLoggedIn } = useContext(AuthContext)
 
  return (
    <div className="demo">
      <AppBarContext />
      <main className="demo__body">
        {isLoggedIn ? <HomeContext /> : <LoginContext />}
      </main>
    </div>
  )
}

const ContextAPIWrapper = () => {
    return (
        <AuthContextProvider>
            <ContextAPIScreen />
        </AuthContextProvider>
    )
}

export default ContextAPIWrapper