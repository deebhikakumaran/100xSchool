import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomUser.css'; 

const UserDetails = ({user}) => {
  return (
    <div className="user-card">
      <img src={user.picture.medium} alt={user.name.first} className="user-image"/>
      <h2>{user.name.title} {user.name.first} {user.name.last}</h2>
    </div>
  )
}

const RandomUser = () => {
  const [usersData, setUsersData] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      if (page==1) setIsLoading(true);
      try {
        const res = await axios.get(`https://randomuser.me/api?page=${page}&results=5`)
        console.log('fetched users:', res.data.results)
        setUsersData((prev) => [...prev, ...res.data.results])
      } 
      catch (err) {
        console.error('error fetching users:', err)
      }
      if (page==1) setIsLoading(false)
    }
    fetchUsers()
  }, [page])

  const handleLoad = () => {
    setPage((prev) => prev+1)
  }
  
  return (
    <div className="random-user-container">
      <h1>Random Users</h1>
      {isLoading ? 
        <p className="loading-text">Loading...</p> : 
      
        <div className="user-list" style={{ align: "center", display: 'flex', flexWrap: 'wrap' }}>
              {usersData.map((u, i) => <UserDetails key={i} user={u} />)}
        </div>
      }
      <button onClick={handleLoad} className="load-more-button"> Load more </button>
    </div>
  );
};

export default RandomUser;
