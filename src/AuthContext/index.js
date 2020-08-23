import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchParentData = async () => {
            const id = localStorage.getItem('currentUser')
            try {
                console.log(id)
                const response = await api.isAuthenticated(id)
                console.log(response.data.data.parentName)
                if (!response.data.data) {
                    setUser(null)
                    setIsAuthenticated(false)
                    setIsLoaded(true)
                } else {
                setUser(response.data.data.parentName);
                setIsAuthenticated(true);
                setIsLoaded(true);
                }
            } catch (e) {
                setUser(null)
                setIsAuthenticated(false)
                setIsLoaded(true)
                console.log(e)
            }
        }
        fetchParentData()
        console.log('line32')
    }, []);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}