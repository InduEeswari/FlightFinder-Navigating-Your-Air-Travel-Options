import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userRes = await axios.get('http://localhost:6001/fetch-users');
    setUserCount(userRes.data.length - 1);
    setUsers(userRes.data.filter(user => user.approval === 'not-approved'));

    const bookingRes = await axios.get('http://localhost:6001/fetch-bookings');
    setBookingCount(bookingRes.data.length);

    const flightRes = await axios.get('http://localhost:6001/fetch-flights');
    setFlightsCount(flightRes.data.length);
  };

  const approveRequest = async (id) => {
    await axios.post('http://localhost:6001/approve-operator', { id });
    alert('Operator approved!');
    fetchData();
  };

  const rejectRequest = async (id) => {
    await axios.post('http://localhost:6001/reject-operator', { id });
    alert('Operator rejected!');
    fetchData();
  };

  return (
    <div className="admin-page">

      <div className="admin-dashboard-layout">
        {/* Left Side: Vertical Cards */}
        <div className="admin-page-cards-vertical">
          <div className="card admin-card">
            <h4>Users</h4>
            <p>{userCount}</p>
            <button className="btn btn-primary" onClick={() => navigate('/all-users')}>View all</button>
          </div>

          <div className="card admin-card">
            <h4>Bookings</h4>
            <p>{bookingCount}</p>
            <button className="btn btn-primary" onClick={() => navigate('/all-bookings')}>View all</button>
          </div>

          <div className="card admin-card">
            <h4>Flights</h4>
            <p>{flightsCount}</p>
            <button className="btn btn-primary" onClick={() => navigate('/all-flights')}>View all</button>
          </div>
        </div>

        {/* Right Side: Requests */}
        <div className="admin-requests-container">
          <h3>New Operator Applications</h3>
          <div className="admin-requests">
            {users.length === 0 ? (
              <p>No new requests...</p>
            ) : (
              users.map((user) => (
                <div className="admin-request" key={user._id}>
                  <span><b>Operator name:</b> {user.username}</span>
                  <span><b>Operator email:</b> {user.email}</span>
                  <div className="admin-request-actions">
                    <button className="btn btn-primary" onClick={() => approveRequest(user._id)}>Approve</button>
                    <button className="btn btn-danger" onClick={() => rejectRequest(user._id)}>Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
