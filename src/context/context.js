import { createContext, useState } from "react";

export const newContext = createContext()

export const NewProvider = (props) => {

    const [state, setState] = useState('')

    const value = { 
        state,
        setState
    }

    return (
        <newContext.Provider value={value}> 
            {props.children}
    </newContext.Provider>
    )

}

