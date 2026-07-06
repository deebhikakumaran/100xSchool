import React from 'react'

const Header = ({message}) => {
  return (
    <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', 
                  backgroundColor: "#c59771bd", padding: "16px 32px" }}>
      {message}
    </div>
  )
}

export default Header