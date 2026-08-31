import { useState, useEffect } from 'react';
import API from '../services/api';

const Attendance = () => {
    const [classes] = useState(['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7']);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (selectedClass) {
            fetchStudentsByClass(selectedClass);
        }
    }, [selectedClass]);

    const fetchStudentsByClass = async (className) => {
        try {
            setLoading(true);
            const response = await API.get('/students');
            const classStudents = response.data.filter(s => s.grade === className);
            setStudents(classStudents);

            const initialStatus = {};
            classStudents.forEach(s => {
                initialStatus[s.id] = 'PRESENT';
            });
            setAttendanceStatus(initialStatus);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching students:', err);
            setLoading(false);
        }
    };

    const handleStatusChange = (studentId, status) => {
        setAttendanceStatus(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmitAttendance = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];

            const requests = students.map(student => {
                return API.post('/attendance', {
                    date: today,
                    status: attendanceStatus[student.id] || 'PRESENT',
                    studentId: student.id,
                    studentName: student.name,
                    cardId: student.cardId,
                    gender: student.gender,
                    grade: student.grade
                });
            });

            await Promise.all(requests);

            setSuccessMessage(`✅ បានកត់ត្រាវត្តមានថ្នាក់ ${selectedClass} ជោគជ័យ!`);
            setTimeout(() => setSuccessMessage(''), 4000);
        } catch (err) {
            console.error('Error saving attendance:', err);
            alert('មានបញ្ហាក្នុងការកត់ត្រាវត្តមាន!');
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>📋 កត់ត្រាវត្តមានសិស្សតាមថ្នាក់រៀន</h2>
            </div>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="card shadow-sm mb-4 border-0 rounded-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">🏫 សូមជ្រើសរើសថ្នាក់រៀន៖</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {classes.map((cls) => (
                            <button
                                key={cls}
                                className={`btn px-4 py-2 rounded-pill fw-bold ${selectedClass === cls ? 'btn-primary shadow' : 'btn-outline-secondary'}`}
                                onClick={() => setSelectedClass(cls)}
                            >
                                ថ្នាក់ {cls}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selectedClass ? (
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                        <h5 className="mb-0">👨‍🎓 បញ្ជីឈ្មោះសិស្សថ្នាក់: <span className="text-warning">{selectedClass}</span></h5>
                        <button className="btn btn-success btn-sm px-4 fw-bold" onClick={handleSubmitAttendance}>
                            💾 រក្សាទុកវត្តមាន
                        </button>
                    </div>
                    <div className="card-body">
                        {loading ? (
                            <div className="text-center my-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : students.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-light">
                                    <tr>
                                        <th>អត្តលេខ</th>
                                        <th>ឈ្មោះសិស្ស</th>
                                        <th>ភេទ</th>
                                        <th className="text-center">ស្ថានភាពវត្តមាន (វត្តមាន / អវត្តមាន / ច្បាប់)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((s) => (
                                        <tr key={s.id}>
                                            <td>{s.cardId || 'N/A'}</td>
                                            <td className="fw-bold">{s.name}</td>
                                            <td>{s.gender}</td>
                                            <td className="text-center">
                                                <div className="btn-group" role="group">
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name={`status-${s.id}`}
                                                        id={`present-${s.id}`}
                                                        checked={attendanceStatus[s.id] === 'PRESENT'}
                                                        onChange={() => handleStatusChange(s.id, 'PRESENT')}
                                                    />
                                                    <label className="btn btn-outline-success btn-sm" htmlFor={`present-${s.id}`}>
                                                        ✅ វត្តមាន
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name={`status-${s.id}`}
                                                        id={`absent-${s.id}`}
                                                        checked={attendanceStatus[s.id] === 'ABSENT'}
                                                        onChange={() => handleStatusChange(s.id, 'ABSENT')}
                                                    />
                                                    <label className="btn btn-outline-danger btn-sm" htmlFor={`absent-${s.id}`}>
                                                        ❌ អវត្តមាន
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name={`status-${s.id}`}
                                                        id={`permission-${s.id}`}
                                                        checked={attendanceStatus[s.id] === 'PERMISSION'}
                                                        onChange={() => handleStatusChange(s.id, 'PERMISSION')}
                                                    />
                                                    <label className="btn btn-outline-warning btn-sm text-dark" htmlFor={`permission-${s.id}`}>
                                                        ⚠️ ច្បាប់
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center text-muted py-5">
                                ❌ ពុំមានទិន្នន័យសិស្សនៅក្នុងថ្នាក់ {selectedClass} នេះទេ!
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="alert alert-info text-center py-4 rounded-4 shadow-sm">
                    👆 សូមចុចជ្រើសរើសថ្នាក់រៀនខាងលើ (ពី E1 ដល់ E7) ដើម្បីបង្ហាញបញ្ជីសិស្សសម្រាប់កត់ត្រាវត្តមាន។
                </div>
            )}
        </div>
    );
};

export default Attendance;