import React, { useEffect, useState } from 'react';
import '../styles/userbookings.css';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:6001/fetch-bookings');
    setBookings(res.data.reverse());
  };

  const cancelTicket = async (id) => {
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
    alert('Ticket cancelled!');
    fetchBookings();
  };

  return (
    <div className="bookings-wrapper">
      <h1 className="bookings-title">Your Bookings</h1>

      <div className="bookings-grid">
        {bookings.filter(b => b.user === userId).map((booking) => (
          <div className="booking-card" key={booking._id}>
            <div className="booking-columns">
              {/* Left Section */}
              <div className="booking-left">
                <p><strong>Booking ID:</strong> {booking._id}</p>
                <p><strong>Mobile:</strong> {booking.mobile}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Flight Name:</strong> {booking.flightName}</p>
                <p><strong>Flight ID:</strong> {booking.flightId}</p>
                <p><strong>Departure:</strong> {booking.departure}</p>
                <p><strong>Destination:</strong> {booking.destination}</p>
              </div>

              {/* Right Section */}
              <div className="booking-right">
                <p><strong>Booking Date:</strong> {booking.bookingDate.slice(0, 10)}</p>
                <p><strong>Journey Date:</strong> {booking.journeyDate.slice(0, 10)}</p>
                <p><strong>Journey Time:</strong> {booking.journeyTime}</p>
                <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>

                <p><strong>Passengers:</strong></p>
                <ol>
                  {booking.passengers.map((p, i) => (
                    <li key={i}><span><strong>Name:</strong> {p.name}, <strong>Age:</strong> {p.age}</span></li>
                  ))}
                </ol>

                {booking.bookingStatus === 'confirmed' && (
                  <p><strong>Seats:</strong> {booking.seats}</p>
                )}

                <p className={booking.bookingStatus === 'cancelled' ? 'cancelled' : 'confirmed'}>
                  <strong>Status:</strong> {booking.bookingStatus}
                </p>

                {booking.bookingStatus === 'confirmed' && (
                  <button className="btn btn-danger" onClick={() => cancelTicket(booking._id)}>
                    Cancel Ticket
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
