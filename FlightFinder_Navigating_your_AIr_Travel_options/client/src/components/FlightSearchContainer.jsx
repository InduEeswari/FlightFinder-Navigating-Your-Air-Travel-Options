import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';
import '../styles/LandingPage.css';

const FlightSearchContainer = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [Flights, setFlights] = useState([]);

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const fetchFlights = async () => {
    const date = new Date();
    const date1 = new Date(departureDate);
    const date2 = new Date(returnDate);

    if (checkBox) {
      if (departure && destination && departureDate && returnDate) {
        if (date1 > date && date2 > date1) {
          const res = await axios.get('http://localhost:6001/fetch-flights');
          setFlights(res.data);
          setError('');
        } else {
          setError('Please check the dates');
        }
      } else {
        setError('Please fill all the details');
      }
    } else {
      if (departure && destination && departureDate) {
        if (date1 >= date) {
          const res = await axios.get('http://localhost:6001/fetch-flights');
          setFlights(res.data);
          setError('');
        } else {
          setError('Please check the dates');
        }
      } else {
        setError('Please fill all the details');
      }
    }
  };

  const handleTicketBooking = (id, origin, destination) => {
    if (userId) {
      if (origin === departure) {
        setTicketBookingDate(departureDate);
      } else {
        setTicketBookingDate(returnDate);
      }
      navigate(`/book-flight/${id}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="flight-background">
      <div className="flight-search-box">
        <h3 className="text-center mb-3">Search Flights</h3>

        

        <div className="form-floating mb-3">
          <select className="form-select" value={departure} onChange={(e) => setDeparture(e.target.value)}>
            <option value="" disabled>Select</option>
            <option value="Ahmedabad">Ahmedabad</option>
<option value="Amritsar">Amritsar</option>
<option value="Coimbatore">Coimbatore</option>
<option value="Goa">Goa</option>
<option value="Guwahati">Guwahati</option>
<option value="Lucknow">Lucknow</option>
<option value="Nagpur">Nagpur</option>
<option value="Patna">Patna</option>
<option value="Ranchi">Ranchi</option>
<option value="Raipur">Raipur</option>
<option value="Surat">Surat</option>
<option value="Chandigarh">Chandigarh</option>
<option value="Visakhapatnam">Visakhapatnam</option>
<option value="Madurai">Madurai</option>
<option value="Tirupati">Tirupati</option>

          </select>
          <label>Origin City</label>
        </div>

        <div className="form-floating mb-3">
          <select className="form-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="" disabled>Select</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Amritsar">Amritsar</option>
<option value="Coimbatore">Coimbatore</option>
<option value="Goa">Goa</option>
<option value="Guwahati">Guwahati</option>
<option value="Lucknow">Lucknow</option>
<option value="Nagpur">Nagpur</option>
<option value="Patna">Patna</option>
<option value="Ranchi">Ranchi</option>
<option value="Raipur">Raipur</option>
<option value="Surat">Surat</option>
<option value="Chandigarh">Chandigarh</option>
<option value="Visakhapatnam">Visakhapatnam</option>
<option value="Madurai">Madurai</option>
<option value="Tirupati">Tirupati</option>

            

          </select>
          <label>Destination City</label>
        </div>
        

        <div className="form-floating mb-3">
          <input type="date" className="form-control" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          <label>Journey date</label>
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => setCheckBox(e.target.checked)} />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Return Journey</label>
        </div>

        {checkBox && (
          <div className="form-floating mb-3">
            <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            <label>Return date</label>
          </div>
        )}

        <button className="btn btn-primary w-100 mb-3" onClick={fetchFlights}>Search</button>

        {error && <p className="text-danger text-center">{error}</p>}
      </div>

      {Flights.length > 0 && (
        <div className="availableFlightsContainer mt-4">
          <h4>Available Flights</h4>
          <div className="Flights">
            {(checkBox
              ? Flights.filter(f => (f.origin === departure && f.destination === destination) || (f.origin === destination && f.destination === departure))
              : Flights.filter(f => f.origin === departure && f.destination === destination)
            ).map((flight) => (
              <div className="Flight" key={flight._id}>
                <div><p><b>{flight.flightName}</b></p><p><b>Flight No:</b> {flight.flightId}</p></div>
                <div><p><b>From:</b> {flight.origin}</p><p><b>Dep:</b> {flight.departureTime}</p></div>
                <div><p><b>To:</b> {flight.destination}</p><p><b>Arr:</b> {flight.arrivalTime}</p></div>
                <div><p><b>₹{flight.basePrice}</b></p><p><b>Seats:</b> {flight.totalSeats}</p></div>
                <button className="btn btn-success mt-2" onClick={() => handleTicketBooking(flight._id, flight.origin, flight.destination)}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearchContainer;
