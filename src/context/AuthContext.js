
import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':  return {  user: action.payload} 
        case 'LOGOUT': return { user: null}
        default: return state
    }

}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect( () => {
       
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(userInfo) { dispatch({type: "LOGIN", payload: {...userInfo}})}
      
    }, [])
    console.log('Auth State', state)

    return (<AuthContext.Provider value={{...state, dispatch}}> 
                 {children}
    </AuthContext.Provider>)
}