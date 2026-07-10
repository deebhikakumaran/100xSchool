
const AppBar = ({isLoggedIn, username, onLogout}) => {
  return (
    <header className="appbar">
      <span className="appbar__logo">◆ app</span>
      <div className="appbar__right">
        {isLoggedIn ? (
          <>
            <span className="appbar__user">welcome, {username}!</span>
            <button className="appbar__logout" onClick={onLogout}>
              logout
            </button>
          </>
        ) : (
          <span className="appbar__user appbar__user--muted"></span>
        )}
      </div>
    </header>
  )
}

export default AppBar