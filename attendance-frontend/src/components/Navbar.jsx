import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold">🎓 School Attendance System</span>
                <div className="d-flex align-items-center">
                    <span className="text-white me-3">👤 Admin</span>
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={handleLogout}
                    >
                        🚪 ចាកចេញ (Logout)
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;