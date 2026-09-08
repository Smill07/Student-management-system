import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth'
const ProtectedRoute = ({ children }) => { const { loading, user } = useAuth(); const location = useLocation(); if (loading) return <div className="p-12 text-slate-500">Restoring secure session…</div>; return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} /> }
export default ProtectedRoute
