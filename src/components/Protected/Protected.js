import { Navigate } from "react-router";

const Protected = ({children}) => {

    const localInfo = localStorage.getItem('userInfo')
    if(!localInfo) { return <Navigate to='/sign-in' replace/>}

    return children
}
 
export default Protected;