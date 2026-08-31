import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import bgImage from '../assets/rupp2.jpg'; // ដាក់រូបភាពរបស់បងទីនេះ

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await API.post('/auth/login', { username, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (err) {
            setError('ឈ្មោះអ្នកប្រើប្រាស់ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            className="d-flex justify-content-center align-items-center vh-100 "
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}
          >


            <div
                className="card p-4"
                style={{
                    width: '400px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
            >
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-white">🔐 ចូលប្រព័ន្ធ</h3>
                    <p className="text-white-50">School Attendance System</p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-white">👤 Username</label>
                        <input type="text" className="form-control" placeholder="បញ្ចូល Username"
                               value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold text-white">🔑 Password</label>
                        <input type="password" className="form-control" placeholder="បញ្ចូល Password"
                               value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="text-end mb-3">
                        <Link to="/forgot-password" className="text-white small">
                            Forget password?
                        </Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                        {loading ? 'Loading...' : '🚀 ចូលប្រព័ន្ធ (Login)'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;