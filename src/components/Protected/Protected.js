import { Navigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const Protected = ({children}) => {

    const {user} = useAuthContext()
    
    if(!user) { return <Navigate to='/sign-in' replace/>}

    return children;
}
 
export default Protected;