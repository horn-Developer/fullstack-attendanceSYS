import { useState, useEffect } from 'react';
import API from '../services/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: '', password: '', role: 'TEACHER' });
    const [editingId, setEditingId] = useState(null);

    const fetchUsers = async () => {
        const res = await API.get('/users');
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await API.put(`/users/${editingId}`, form);
        } else {
            await API.post('/users', form);
        }
        setForm({ username: '', password: '', role: 'TEACHER' });
        setEditingId(null);
        fetchUsers();
    };

    const handleEdit = (user) => {
        setForm({ username: user.username, password: user.password, role: user.role });
        setEditingId(user.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('តើអ្នកប្រាកដថាចង់លុបទេ?')) {
            await API.delete(`/users/${id}`);
            fetchUsers();
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">👤 គ្រប់គ្រងអ្នកប្រើប្រាស់ (Users)</h3>

            <form onSubmit={handleSubmit} className="row g-2 mb-4">
                <div className="col-md-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="ឈ្មោះអ្នកប្រើ"
                        className="form-control"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="ពាក្យសម្ងាត់"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-3">
                    <select
                        name="role"
                        className="form-control"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="TEACHER">TEACHER</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <button type="submit" className="btn btn-primary w-100">
                        {editingId ? 'កែប្រែ' : 'បន្ថែម'}
                    </button>
                </div>
            </form>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>ល.រ</th>
                    <th>ឈ្មោះអ្នកប្រើ</th>
                    <th>តួនាទី</th>
                    <th>សកម្មភាព</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(user)}
                            >
                                កែប្រែ
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(user.id)}
                            >
                                លុប
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;