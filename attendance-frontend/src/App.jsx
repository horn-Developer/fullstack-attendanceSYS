import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

import './App.css';

// ប្រើប្រាស់ lazy loading ដើម្បីបង្កើនល្បឿនដំណើរការ Page នីមួយៗ
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Students = lazy(() => import('./pages/Students'));
const Attendance = lazy(() => import('./pages/Attendance'));
const Reports = lazy(() => import('./pages/Reports'));
const Users = lazy(() => import('./pages/Users'));
const Classes = lazy(() => import('./pages/Classes'));
const ForgetPass = lazy(() => import('./pages/ForgotPassword'));

const Layout = () => {
    const location = useLocation();
    // ✅ កែត្រង់នេះ: check ទាំង /login និង /forgot-password
    const isAuthPage = location.pathname === '/login' || location.pathname === '/forgot-password';

    return (
        <div className="app-container">
            {/* ផ្នែកខាងលើ: Navbar (បង្ហាញលើកលែងតែពេល Login / Forgot Password) */}
            {!isAuthPage && <Navbar />}

            {/* ផ្នែកកណ្តាល: បែងចែក Sidebar និង Content */}
            <div className="main-body">
                {!isAuthPage && (
                    <aside className="sidebar-section">
                        <Sidebar />
                    </aside>
                )}

                <main className="content-section">
                    {/* ដាក់ Suspense ជាមួយ Loading ដើម្បីបង្ហាញពេលកំពុងរង់ចាំទាញយក Page */}
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgetPass />} />
                            {/* ទំព័រទាំងនេះត្រូវការពារដោយ ProtectedRoute */}
                            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
                            <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
                            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                            <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>} />
                            <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>

            {/* ផ្នែកខាងក្រោម: Footer (បង្ហាញលើកលែងតែពេល Login / Forgot Password) */}
            {!isAuthPage && <Footer />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;