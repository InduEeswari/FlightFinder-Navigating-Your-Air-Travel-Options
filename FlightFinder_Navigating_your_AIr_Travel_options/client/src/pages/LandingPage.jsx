import React, { useEffect } from 'react';
import '../styles/LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') navigate('/admin');
    else if (userType === 'flight-operator') navigate('/flight-admin');
  }, [navigate]);

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">Discover Seamless Flight Booking with SB FlightConnect</h1>
          <p className="banner-p">
            Plan, book, and embark on journeys to your favorite destinations with ease. Whether it's business, vacation, or family travel — we're here to make your flying experience smoother and smarter.
          </p>
        </div>

        {/* Link to Flight Search Page */}
        <div className="Flight-search-link-wrapper" style={{ margin: '30px auto', textAlign: 'center' }}>
          <Link to="/search" className="btn btn-light btn-lg">
            Go to Flight Search
          </Link>
        </div>
      </div>

      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About SB FlightConnect</h2>
          <p className="section-description">
            &nbsp;&nbsp;&nbsp;&nbsp; SB FlightConnect is your all-in-one solution for effortless and reliable flight bookings across India. Whether you're catching a quick domestic flight or planning a round trip, our platform ensures a hassle-free experience.
          </p>
          <p className="section-description">
            &nbsp;&nbsp;&nbsp;&nbsp; We combine smart technology with a user-first design to offer real-time flight listings, transparent fares, and secure booking options. Our mission is to simplify your travel planning while offering the best routes and competitive prices from trusted airlines.
          </p>
          <p className="section-description">
            &nbsp;&nbsp;&nbsp;&nbsp; At SB FlightConnect, we value your time and trust. From selecting your seat to final confirmation, we make sure you’re in control every step of the way. Let your journey begin here, with confidence, comfort, and clarity.
          </p>

          <span><h5>© 2025 SB FlightConnect. All rights reserved.</h5></span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
