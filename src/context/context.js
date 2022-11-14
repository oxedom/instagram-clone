import { createContext, useState, } from "react";

 export const newContext = createContext(null)

export const NewProvider = (props) => {
    const [userData, setUserData] = useState(false)

    return (
        <newContext.Provider value={{userData, setUserData}} > 
            {props.children}
    </newContext.Provider>
    )

}

