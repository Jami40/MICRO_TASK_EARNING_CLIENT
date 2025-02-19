import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaTrash, FaCoins } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('https://micro-task-earning-server.vercel.app/admin/users');
            setUsers(data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            const loadingToast = toast.loading('Updating role...');
            
            await axios.patch(`https://micro-task-earning-server.vercel.app/admin/users/role/${userId}`, {
                role: newRole
            });

            toast.dismiss(loadingToast);
            toast.success('Role updated successfully');
            
            // Update local state
            setUsers(users?.map(user => 
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleDeleteUser = async (userId, displayName) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                html: `
                    <p>You are about to delete user:</p>
                    <p class="text-lg font-bold text-red-600">${displayName}</p>
                    <p class="text-sm text-gray-500 mt-2">This action cannot be undone!</p>
                `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const loadingToast = toast.loading('Deleting user...');
                
                await axios.delete(`https://micro-task-earning-server.vercel.app/admin/users/${userId}`);
                
                toast.dismiss(loadingToast);
                toast.success('User deleted successfully');
                
                // Update local state
                setUsers(users.filter(user => user._id !== userId));
            }
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <MdAdminPanelSettings className="text-primary" />
                        Manage Users
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Coins</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user._id}>
                                        {/* User Info */}
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img 
                                                            src={user.photo || '/default-avatar.png'} 
                                                            alt={user.name}
                                                            onError={(e) => {
                                                                e.target.src = '/default-avatar.png';
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td>{user.email}</td>

                                        {/* Role Dropdown */}
                                        <td>
                                            <select 
                                                className="select select-bordered select-sm w-full max-w-xs"
                                                value={user.role}
                                                onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="buyer">Buyer</option>
                                                <option value="worker">Worker</option>
                                            </select>
                                        </td>

                                        {/* Coins */}
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <FaCoins className="text-yellow-500" />
                                                {user.coins || 0}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, user.display_name)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;