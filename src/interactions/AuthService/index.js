//DEPENDENCIES
import React, { createContext, useState, useEffect} from 'react';

//STORAGE
import local from '../../storage/localStorage';


export const AuthService = createContext(); 


export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const user = local.get('currentUser')
        const userId = local.get('currentId')
        setUser(user);
        setUserId(userId)
        setIsAuthenticated(true)
        setIsLoaded(true);
    }, [user]); // using UseEffect to always get user when refreshing page. 

    return (
        <React.Fragment>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthService.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, userId, setUserId }}>
                    {children}
                </AuthService.Provider>}
        </React.Fragment>
    )
}
