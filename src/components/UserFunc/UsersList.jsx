import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import UserCard from './UserCard';
import Header from '../Header/Header';

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  limit: 1
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error('Failed to fetch users', toastConfig);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
        
        if (users.length === 1) {
          const newPage = page > 1 ? page - 1 : 1;
          setPage(newPage);
        }
        
        toast.success('User deleted successfully', toastConfig);
      } catch (error) {
        toast.error('Failed to delete user', toastConfig);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const searchTerm = searchQuery.toLowerCase().trim();
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="users-grid">
              {filteredUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onDelete={handleDelete}
                  onUpdate={fetchUsers}
                />
              ))}
            </div>
            <div className="pagination">
              <div className="pagination-nav">
                <button 
                  className="nav-icon"
                  onClick={() => setPage(p => p - 1)} 
                  disabled={page === 1}
                >
                  <NavigateBeforeRoundedIcon />
                </button>
                <div className="page-number">
                  {page} / {totalPages}
                </div>
                <button 
                  className="nav-icon"
                  onClick={() => setPage(p => p + 1)} 
                  disabled={page === totalPages}
                >
                  <NavigateNextRoundedIcon />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UsersList;