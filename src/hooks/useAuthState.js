

import { useAuthContext } from "./useAuthContext";


export const useAuthState = () => {
    const {dispatch} = useAuthContext()
    const checkLogin = () => {
 
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  
        if(userInfo) {
            dispatch({type: "LOGIN", payload: {...userInfo}})
        }
      
    }

    return {checkLogin}
}