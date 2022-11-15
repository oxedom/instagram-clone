
import { useLocation, Navigate } from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'

function RequireAuth(props, { children }) {

   
    const {isLoggedIn} = props.props
    const location = useLocation();

  
   

    return isLoggedIn() === true ? props.children : <Navigate to="/sign-in" replace state={{path:location.pathname }} />;
  }

export default RequireAuth  