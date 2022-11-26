import { createContext, useState } from "react";
import Login from "../modules/Login";
import Album from './../modules/Album';
import Listado from './../modules/Listado';

export const GlobalContext = createContext();
export const GlobalProvider = props => {
    const token = window.localStorage.getItem('infoLoginApp');    
    const [global, setGlobal] = useState({
        module: token != null && token != ' ' ? <Listado/> : <Login/>
    })

    return(
        <GlobalContext.Provider value={[global, setGlobal]}>
            {props.children}
        </GlobalContext.Provider>
    )
}