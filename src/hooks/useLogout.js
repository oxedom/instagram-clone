
import { useAuthContext } from "./useAuthContext";
import { auth} from '../firebase'
export const useLogout = () => {

const { dispatch} = useAuthContext()

const logout =  async () => {

         localStorage.setItem('userInfo', null)

        //Dispatching login event to update context
        await auth.signOut()
        dispatch({type: "LOGOUT"})
 
} 
return { logout}
}