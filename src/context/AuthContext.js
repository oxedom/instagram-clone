
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
        console.log('1');
        if(userInfo) { dispatch({type: "LOGIN", payload: {...userInfo}})}

    }, [])


    return (<AuthContext.Provider value={{...state, dispatch}}> 
                 {children}
    </AuthContext.Provider>)
}