import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Header.css';

const Header = ({ onSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Users</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            onChange={handleSearch}
          />
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;