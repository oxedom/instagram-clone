import { Navigate } from "react-router";

const Protected = ({children}) => {

    if(!localStorage.getItem('userInfo')) { return <Navigate to='/sign-in' replace/>}

    return children
}
 
export default Protected;