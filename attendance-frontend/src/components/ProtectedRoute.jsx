import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // បើគ្មាន User Login ទេ ឱ្យលោតទៅកាន់ Page Login វិញ
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;