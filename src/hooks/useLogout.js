

import { auth} from '../firebase'
export const useLogout = () => {



const logout =  async () => {

         localStorage.setItem('userInfo', null)
        await auth.signOut()
 
} 
return { logout}
}