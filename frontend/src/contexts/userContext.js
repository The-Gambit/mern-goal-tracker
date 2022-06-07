import { useState, useContext, createContext } from "react";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    return (<>
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    </>)
}

export const useUserContext = () => useContext(UserContext);