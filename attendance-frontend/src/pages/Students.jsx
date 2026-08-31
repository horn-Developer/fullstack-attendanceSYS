import { useState, useEffect } from 'react';
import API from '../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State សម្រាប់ទិន្នន័យស្វែងរក
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State សម្រាប់គ្រប់គ្រងទម្រង់បន្ថែមសិស្សថ្មី (Add Student Form)
    const [showModal, setShowModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        cardId: '',
        name: '',
        gender: 'ប្រុស',
        grade: ''
    });

    const fetchStudents = async () => {
        try {
            const response = await API.get('/students');
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('មិនអាចទាញយកទិន្នន័យសិស្សបានទេ!');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // មុខងារបញ្ជូនទិន្នន័យសិស្សថ្មីទៅកាន់ Backend
    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/students', newStudent);
            setStudents([...students, response.data]); // បន្ថែមចូលតារាងភ្លាមៗដោយមិនបាច់ Refresh
            setShowModal(false); // បិទ Form វិញ
            setNewStudent({ cardId: '', name: '', gender: 'ប្រុស', grade: '' }); // សម្អាត Form
        } catch (err) {
            console.error('Error adding student:', err);
            alert('មានបញ្ហាក្នុងការបន្ថែមសិស្សថ្មី!');
        }
    };

    // មុខងារលុបទិន្នន័យសិស្សតាម ID
    const handleDelete = async (id) => {
        if (window.confirm('តើបងពិតជាចង់លុបសិស្សម្នាក់នេះមែនទេ?')) {
            try {
                await API.delete(`/students/${id}`);
                setStudents(students.filter((s) => s.id !== id));
            } catch (err) {
                console.error('Error deleting student:', err);
                alert('មានបញ្ហាក្នុងการលុបទិន្នន័យសិស្ស!');
            }
        }
    };

    // ត្រងទិន្នន័យសិស្សតាមការស្វែងរក (Search by Name or Card ID)
    const filteredStudents = students.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.cardId && s.cardId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>👨‍🎓 គ្រប់គ្រងបញ្ជីឈ្មោះសិស្ស</h2>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    ➕ បន្ថែមសិស្សថ្មី
                </button>
            </div>

            {/* Form ឬ Modal សម្រាប់បន្ថែមសិស្សថ្មី */}
            {showModal && (
                <div className="card shadow mb-4 border-success">
                    <div className="card-header bg-success text-white fw-bold">
                        ➕ បញ្ចូលព័ត៌មានសិស្សថ្មី
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAddStudent}>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label">អត្តលេខ (Card ID)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newStudent.cardId}
                                        onChange={(e) => setNewStudent({...newStudent, cardId: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">ឈ្មោះសិស្ស</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newStudent.name}
                                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">ភេទ</label>
                                    <select
                                        className="form-select"
                                        value={newStudent.gender}
                                        onChange={(e) => setNewStudent({...newStudent, gender: e.target.value})}
                                    >
                                        <option value="ប្រុស">ប្រុស</option>
                                        <option value="ស្រី">ស្រី</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">ថ្នាក់</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newStudent.grade}
                                        onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-2 d-flex align-items-end">
                                    <button type="submit" className="btn btn-primary w-100 me-2">រក្សាទុក</button>
                                    <button type="button" className="btn btn-secondary w-100" onClick={() => setShowModal(false)}>បោះបង់</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 🔶 ប្រអប់ស្វែងរក (Search Bar) */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 ស្វែងរកតាមឈ្មោះ ឬអត្តលេខសិស្ស..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">កំពុងទាញយកទិន្នន័យ...</p>
                </div>
            ) : (
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>អត្តលេខ</th>
                                    <th>ឈ្មោះសិស្ស</th>
                                    <th>ភេទ</th>
                                    <th>ថ្នាក់</th>
                                    <th className="text-center">សកម្មភាព</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((s) => (
                                        <tr key={s.id}>
                                            <td>{s.id}</td>
                                            <td>{s.cardId || 'N/A'}</td>
                                            <td className="fw-bold">{s.name}</td>
                                            <td>{s.gender}</td>
                                            <td>
                                                <span className="badge bg-secondary">{s.grade}</span>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-sm btn-warning me-2">✏️ កែប្រែ</button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(s.id)}
                                                >
                                                    🗑️ លុប
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-4">
                                            រកមិនឃើញទិន្នន័យសិស្សដែលស្វែងរកទេ!
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;