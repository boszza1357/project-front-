import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();

  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:7000/userupdateRole/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {

      await axios.put(`http://localhost:7000/userupdateRole/updateRole`, { userId, newRole });
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      });
      setUsers(updatedUsers);
      alert("Update Rolo Successful")
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">First Name</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Last Name</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Email</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Password</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Phone</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Gender</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Role</th>
          <th className="px-2 py-1 bg-gray-100 border border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="text-center">
            <td className="px-2 py-1 border border-gray-200">{user.firstname}</td>
            <td className="px-2 py-1 border border-gray-200">{user.lastname}</td>
            <td className="px-2 py-1 border border-gray-200">{user.email}</td>
            <td className="px-2 py-1 border border-gray-200">{user.password}</td>
            <td className="px-2 py-1 border border-gray-200">{user.phone}</td>
            <td className="px-2 py-1 border border-gray-200">{user.gender}</td>
            <td className="px-2 py-1 border border-gray-200">{user.role}</td>
            <td className="px-2 py-1 border border-gray-200">
              <button onClick={() => handleUpdateRole(user.id, 'ADMIN')} className="px-2 py-1 bg-blue-500 text-white rounded-md mr-1 hover:bg-blue-600">Admin</button>
              <button onClick={() => handleUpdateRole(user.id, 'USER')} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">User</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  
  );
}

export default UserList;
