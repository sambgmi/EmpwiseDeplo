import { useState } from 'react';
import EditUserModal from './EditUserModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.first_name}`} className="user-avatar" />
      <h3>{user.first_name} {user.last_name}</h3>
      <p>{user.email}</p>
      <div className="card-actions">
        <button className="icon-button edit-btn" onClick={handleEdit} title="Edit user">
          <EditIcon />
        </button>
        <button className="icon-button delete-btn" onClick={() => onDelete(user.id)} title="Delete user">
          <DeleteOutlineIcon />
        </button>
      </div>
      {isEditing && (
        <EditUserModal 
          user={user} 
          onClose={handleClose}
          onUpdate={() => {
            onUpdate();
            handleClose();
          }}
        />
      )}
    </div>
  );
};

export default UserCard;