import React, { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {

  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  }

  return (
    <>
      <div className="login-container">
        <form className="authForm" onSubmit={handleLogin}>
          <h2 className="auth-title">Login</h2>

          <div className="form-floating authFormInputs">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating authFormInputs">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary">Sign in</button>

          <p className="auth-toggle">
            Not registered? <span onClick={() => setIsLogin(false)}>Register</span>
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

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .authForm {
          width: 100%;
          max-width: 420px;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(223, 9, 137, 0.7);
          transition: 0.3s ease;
          border: 3px solid transparent;
        }

        .authForm:hover {
          box-shadow: 0 0 16px rgba(55, 0, 255, 0.83);
        }

        .authFormInputs {
          margin-bottom: 20px;
        }

        .form-control {
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
          background: #3c00ff;
          box-shadow: 0 0 10px rgba(49, 21, 230, 0.7);
        }

        .auth-title {
          margin-bottom: 20px;
          font-weight: bold;
          color: #6a28a7;
        }

        .auth-toggle {
          margin-top: 15px;
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
  )
}

export default Login;
