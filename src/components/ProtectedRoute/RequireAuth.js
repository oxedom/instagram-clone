
import { useLocation, Navigate } from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'

function RequireAuth({ children }) {


    const location = useLocation();
    const { authed} = useAuth();
    console.log('REQUIED AUTH says the user is ' + authed);

    return authed === false ? children : <Navigate to="/sign-in" replace state={{path:location.pathname }} />;
  }

export default RequireAuth  