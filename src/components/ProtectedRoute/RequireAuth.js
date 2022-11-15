
import { useLocation, Navigate } from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'

function RequireAuth({ children }) {

    const location = useLocation();
    const { authed} = useAuth();

    return authed === true ? children : <Navigate to="/sign-in" replace state={{path:location.pathname }} />;
  }

export default RequireAuth  