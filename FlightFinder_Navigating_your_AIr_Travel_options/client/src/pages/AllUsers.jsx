import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/allUsers.css';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="all-users-page">
        <h2 className="title">All Registered Users & Operators</h2>

        <div className="users-operators-container">

          {/* Registered Customers */}
          <div className="user-section">
            <h3>Registered Customers</h3>
            <div className="all-users">
              {users
                .filter(user => user.usertype === 'customer')
                .map(user => (
                  <div className="user-card" key={user._id}>
                    <p className="user-info"><span>User ID:</span> {user._id}</p>
                    <p className="user-info"><span>Username:</span> {user.username}</p>
                    <p className="user-info"><span>Email:</span> {user.email}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Flight Operators */}
          <div className="user-section">
            <h3>Flight Operators</h3>
            <div className="all-users">
              {users
                .filter(user => user.usertype === 'flight-operator')
                .map(user => (
                  <div className="user-card" key={user._id}>
                    <p className="user-info"><span>Operator ID:</span> {user._id}</p>
                    <p className="user-info"><span>Flight Name:</span> {user.username}</p>
                    <p className="user-info"><span>Email:</span> {user.email}</p>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AllUsers;
