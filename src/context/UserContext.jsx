import { createContext, useState } from 'react'

export const UserContext = createContext();
export const UserProvider = props => {
    const [userState, setUserState] = useState({
        usuario: '',
        isLogged: false
    });
    return (
        <UserContext.Provider value={[userState, setUserState]}>
            {props.children}
        </UserContext.Provider>
    )
}