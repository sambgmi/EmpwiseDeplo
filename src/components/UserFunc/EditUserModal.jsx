import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  limit: 1
};

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, userData);
      toast.success('User updated successfully', toastConfig);
      onUpdate();
      onClose();
    } catch (error) {
      toast.error('Failed to update user', toastConfig);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;