import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', credentials);
      localStorage.setItem('token', response.data.token);
      toast.success('Logged in successfully');
      navigate('/users');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {error && <div className="message error">{error}</div>}
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;