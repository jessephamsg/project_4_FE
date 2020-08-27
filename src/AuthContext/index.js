import React, { createContext, useState, useEffect, Component} from 'react';
import api from '../api';
import localStorage from '../storage/localStorage'
import local from '../storage/localStorage';
export const AuthContext = createContext(); // create context


export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const user = localStorage.get('currentUser')
        const userId = local.get('currentId')
        setUser(user);
        setUserId(userId)
        setIsAuthenticated(true)
        setIsLoaded(true);
        console.log('use Effect line32')
    }, [user]); // using UseEffect to always get user when refreshing page. 

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, userId, setUserId }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}
