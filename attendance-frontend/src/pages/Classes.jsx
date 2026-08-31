import { useState, useEffect } from 'react';
import API from '../services/api';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [form, setForm] = useState({ className: '', teacherName: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchClasses = async () => {
        const res = await API.get('/classes');
        setClasses(res.data);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await API.put(`/classes/${editingId}`, form);
        } else {
            await API.post('/classes', form);
        }
        setForm({ className: '', teacherName: '' });
        setEditingId(null);
        fetchClasses();
    };

    const handleEdit = (cls) => {
        setForm({ className: cls.className, teacherName: cls.teacherName });
        setEditingId(cls.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('តើអ្នកប្រាកដថាចង់លុបទេ?')) {
            await API.delete(`/classes/${id}`);
            fetchClasses();
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">🏫 គ្រប់គ្រងថ្នាក់រៀន (Classes)</h3>

            <form onSubmit={handleSubmit} className="row g-2 mb-4">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="className"
                        placeholder="ឈ្មោះថ្នាក់"
                        className="form-control"
                        value={form.className}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        name="teacherName"
                        placeholder="ឈ្មោះគ្រូបង្រៀន"
                        className="form-control"
                        value={form.teacherName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-primary w-100">
                        {editingId ? 'កែប្រែ' : 'បន្ថែម'}
                    </button>
                </div>
            </form>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>ល.រ</th>
                    <th>ឈ្មោះថ្នាក់</th>
                    <th>គ្រូបង្រៀន</th>
                    <th>សកម្មភាព</th>
                </tr>
                </thead>
                <tbody>
                {classes.map((cls, index) => (
                    <tr key={cls.id}>
                        <td>{index + 1}</td>
                        <td>{cls.className}</td>
                        <td>{cls.teacherName}</td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(cls)}
                            >
                                កែប្រែ
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(cls.id)}
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

export default Classes;