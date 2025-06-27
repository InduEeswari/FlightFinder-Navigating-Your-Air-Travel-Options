import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AllFlights.css';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-flights');
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="all-flights-wrapper">
      <h1 className="all-flights-title" align="center"><u>Available Flights</u></h1>

      <div className="flights-grid">
        {flights.map((flight) => (
          <div className="flight-card" key={flight._id}>
            <p className="flight-info"><strong>ID:</strong> {flight._id}</p>
            
            <div className="flight-info-group">
              <p className="flight-info"><strong>Flight ID:</strong> {flight.flightId}</p>
              <p className="flight-info"><strong>Flight Name:</strong> {flight.flightName}</p>
            </div>

            <div className="flight-info-group">
              <p className="flight-info"><strong>From:</strong> {flight.origin}</p>
              <p className="flight-info"><strong>Departure:</strong> {flight.departureTime}</p>
            </div>

            <div className="flight-info-group">
              <p className="flight-info"><strong>To:</strong> {flight.destination}</p>
              <p className="flight-info"><strong>Arrival:</strong> {flight.arrivalTime}</p>
            </div>

            <div className="flight-info-group">
              <p className="flight-info"><strong>Base Price:</strong> ₹{flight.basePrice}</p>
              <p className="flight-info"><strong>Total Seats:</strong> {flight.totalSeats}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlights;
