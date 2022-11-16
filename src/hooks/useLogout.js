
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {

const { dispatch} = useAuthContext()

const logout =  () => {

        localStorage.setItem('userInfo', null)

        //Dispatching login event to update context
        dispatch({type: "LOGOUT"})
 
} 
return { logout}
}