import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(''); setMessage(''); setLoading(true);
        try {
            await API.post('/auth/forgot-password', { email });
            setMessage('OTP ត្រូវបានផ្ញើទៅ Email របស់អ្នកហើយ');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'មានបញ្ហា');
        } finally { setLoading(false); }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(''); setMessage(''); setLoading(true);
        try {
            await API.post('/auth/verify-otp', { email, otp });
            setMessage('OTP ត្រឹមត្រូវ! សូមកំណត់ពាក្យសម្ងាត់ថ្មី');
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'OTP មិនត្រឹមត្រូវ');
        } finally { setLoading(false); }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(''); setMessage(''); setLoading(true);
        try {
            await API.post('/auth/reset-password', { email, otp, newPassword });
            setMessage('កំណត់ពាក្យសម្ងាត់ថ្មីបានជោគជ័យ! កំពុងត្រលប់ទៅ Login...');
            // ✅ រង់ចាំ 1.5s រួច​ត្រលប់ទៅ Login page (មិនចូល Dashboard ស្វ័យប្រវត្តិ)
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'មានបញ្ហា');
        } finally { setLoading(false); }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px' }}>
                <div className="text-center mb-4">
                    <h3 className="fw-bold">🔑 ភ្លេចពាក្យសម្ងាត់</h3>
                    <p className="text-muted small">
                        {step === 1 && 'បញ្ចូល Email ដើម្បីទទួល OTP'}
                        {step === 2 && 'បញ្ចូល OTP ដែលផ្ញើទៅ Email'}
                        {step === 3 && 'កំណត់ពាក្យសម្ងាត់ថ្មី'}
                    </p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}
                {message && <div className="alert alert-success py-2">{message}</div>}

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">📧 Email</label>
                            <input type="email" className="form-control" placeholder="បញ្ចូល Email"
                                   value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                            {loading ? 'កំពុងផ្ញើ...' : 'ផ្ញើ OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">🔢 OTP Code</label>
                            <input type="text" className="form-control" placeholder="បញ្ចូល OTP 6 ខ្ទង់"
                                   value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={6} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                            {loading ? 'កំពុងផ្ទៀងផ្ទាត់...' : 'ផ្ទៀងផ្ទាត់ OTP'}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">🔒 ពាក្យសម្ងាត់ថ្មី</label>
                            <input type="password" className="form-control" placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                                   value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
                        </div>
                        <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
                            {loading ? 'កំពុងរក្សាទុក...' : 'កំណត់ពាក្យសម្ងាត់'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-3">
                    <Link to="/login" className="small text-muted">← ត្រលប់ទៅ Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;