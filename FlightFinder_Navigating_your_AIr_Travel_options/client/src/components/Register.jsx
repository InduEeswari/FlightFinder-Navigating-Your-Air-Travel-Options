import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {

  const {
    setUsername,
    setEmail,
    setPassword,
    usertype,
    setUsertype,
    register,
    setHomeBranch
  } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  }

  return (
    <>
      <div className="register-container">
        <form className="authForm" onSubmit={handleRegister}>
          <h2 className="auth-title">Register</h2>

          <div className="form-floating authFormInputs">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>

          <div className="form-floating authFormInputs">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email address</label>
          </div>

          <div className="form-floating authFormInputs">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <select
            className="form-select form-select-lg mb-3"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
            required
          >
            <option value="">Select user type</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="flight-operator">Flight Operator</option>
          </select>

          <button type="submit" className="btn btn-primary">Sign up</button>

          <p className="auth-toggle">
            Already registered? <span onClick={() => setIsLogin(true)}>Login</span>
          </p>
        </form>
      </div>

      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
        }

        .register-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .authForm {
          width: 100%;
          max-width: 450px;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(128, 0, 255, 0.7);
          transition: 0.3s ease;
          border: 3px solid transparent;
        }

        .authForm:hover {
          box-shadow: 0 0 16px rgba(255, 0, 195, 0.81);
        }

        .authFormInputs {
          margin-bottom: 20px;
        }

        .form-control,
        .form-select {
          padding: 12px;
          border-radius: 8px;
        }

        .btn-primary {
          background: #6a28a7;
          border: none;
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          transition: 0.3s;
        }

        .btn-primary:hover {
          background:rgba(60, 0, 255, 0.91);
          box-shadow: 0 0 10px rgba(17, 0, 255, 0.94);
        }

        .auth-title {
          margin-bottom: 20px;
          font-weight: bold;
          color: #6a28a7;
          text-align: center;
        }

        .auth-toggle {
          margin-top: 15px;
          text-align: center;
        }

        .auth-toggle span {
          color: #3c00ff;
          cursor: pointer;
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .authForm {
            padding: 20px;
            max-width: 90%;
          }
        }
      `}</style>
    </>
  );
}

export default Register;
