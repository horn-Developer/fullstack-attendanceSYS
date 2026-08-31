import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex flex-column p-3 text-white bg-dark sidebar-fixed" style={{ width: '250px' }}>
            <span className="fs-5 fw-bold mb-4 text-center border-bottom pb-2">📂 ម៉ឺនុយគ្រប់គ្រង</span>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2 mt-3">
                    <Link to="/" className={`nav-link text-white ${isActive('/') ? 'active bg-primary' : ''}`}>
                        📊 ទំព័រដើម (Dashboard)
                    </Link>
                </li>
                <li className="nav-item mb-2 mt-3">
                    <Link to="/students" className={`nav-link text-white ${isActive('/students') ? 'active bg-primary' : ''}`}>
                        👨‍🎓 គ្រប់គ្រងសិស្ស (Students)
                    </Link>
                </li>
                <li className="nav-item mb-2 mt-3">
                    <Link to="/classes" className={`nav-link text-white ${isActive('/classes') ? 'active bg-primary' : ''}`}>
                        🏫 ថ្នាក់រៀន (Classes)
                    </Link>
                </li>
                <li className="nav-item mb-2 mt-3">
                    <Link to="/attendance" className={`nav-link text-white ${isActive('/attendance') ? 'active bg-primary' : ''}`}>
                        📝 វត្តមាន (Attendance)
                    </Link>
                </li>
                <li className="nav-item mb-2 mt-3">
                    <Link to="/reports" className={`nav-link text-white ${isActive('/reports') ? 'active bg-primary' : ''}`}>
                        📈 របាយការណ៍ (Reports)
                    </Link>
                </li>
                <li className="nav-item mb-2 mt-3">
                    <Link to="/users" className={`nav-link text-white ${isActive('/users') ? 'active bg-primary' : ''}`}>
                        👤 អ្នកប្រើប្រាស់ (Users)
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;