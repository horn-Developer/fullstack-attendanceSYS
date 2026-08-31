import { useState, useEffect } from 'react';
import API from '../services/api';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [classes] = useState(['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7']);
    const [selectedClass, setSelectedClass] = useState('E1');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReports();
    }, [selectedDate, selectedClass]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            setError('');
            // 🛑 កែសម្រួល៖ បន្ថែម Backticks (``) ឱ្យបានត្រឹមត្រូវសម្រាប់ API URL
            const response = await API.get(`/attendance?date=${selectedDate}`);

            // Filter តាម field grade ក្នុង Table attendance
            const filtered = response.data.filter(item => item.grade === selectedClass);

            setReports(filtered);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching reports:', err);
            setError('មិនអាចទាញយកទិន្នន័យរបាយការណ៍បានទេ!');
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="mb-4">
                <h2>📈 របាយការណ៍វត្តមានសិស្ស (Attendance Reports)</h2>
                <p className="text-muted">ពិនិត្យមើលវត្តមានសិស្សតាមកាលបរិច្ឆេទ និងថ្នាក់រៀន</p>
            </div>

            <div className="card shadow-sm border-0 rounded-4 mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            កាលបរិច្ឆេទ (Date):
                            <input
                                type="date"
                                className="form-control mt-1"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className="col-md-8">
                            ជ្រើសរើសថ្នាក់រៀន:
                            <div className="d-flex flex-wrap gap-2 mt-1">
                                {classes.map((cls) => (
                                    <button
                                        key={cls}
                                        /* 🛑 កែសម្រួល៖ បន្ថែម Backticks (``) ក្នុង className ឱ្យបានត្រឹមត្រូវ */
                                        className={`btn btn-sm px-3 fw-bold rounded-pill ${selectedClass === cls ? 'btn-primary shadow' : 'btn-outline-secondary'}`}
                                        onClick={() => setSelectedClass(cls)}
                                    >
                                        ថ្នាក់ {cls}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm border-0 rounded-4">
                <div className="card-header bg-dark text-white py-3">
                    <h5 className="mb-0">📋 របាយការណ៍ថ្នាក់ <span className="text-warning">{selectedClass}</span> ប្រចាំថ្ងៃទី: {selectedDate}</h5>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center my-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>អត្តលេខ</th>
                                    <th>ឈ្មោះសិស្ស</th>
                                    <th>ភេទ</th>
                                    <th>ថ្នាក់</th>
                                    <th>កាលបរិច្ឆេទ</th>
                                    <th className="text-center">ស្ថានភាពវត្តមាន</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reports.length > 0 ? (
                                    reports.map((item, index) => (
                                        <tr key={item.id || index}>
                                            <td>{item.studentId || index + 1}</td>
                                            <td>{item.cardId || 'N/A'}</td>
                                            <td className="fw-bold">{item.studentName || 'មិនមានឈ្មោះ'}</td>
                                            <td>{item.gender || 'N/A'}</td>
                                            <td><span className="badge bg-secondary">{item.grade || selectedClass}</span></td>
                                            <td>{item.date}</td>
                                            <td className="text-center">
                                                {item.status === 'PRESENT' && <span className="badge bg-success px-3 py-2">✅ វត្តមាន</span>}
                                                {item.status === 'PERMISSION' && <span className="badge bg-warning text-dark px-3 py-2">⚠️ ច្បាប់</span>}
                                                {item.status === 'ABSENT' && <span className="badge bg-danger px-3 py-2">❌ អវត្តមាន</span>}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-5">
                                            គ្មានទិន្នន័យវត្តមានសម្រាប់ថ្នាក់ {selectedClass} ក្នុងថ្ងៃទី {selectedDate} នេះទេ!
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;