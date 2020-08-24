import React, { createContext, useState, useEffect, Component} from 'react';
import api from '../api';

export const AuthContext = createContext(); // create context


export class AuthProvider extends Component {
    state = {
        userid: null,
        isAuthenticated : false,
        isLoaded: false
    }
    async componentDidMount() {
        const id = localStorage.getItem('currentUser') || null
        if (id !== null) {
            this.setState({
                userid: id,
                isAuthenticated : true,
                isLoaded : true
            })
        }
        // const payload = {id : id}
        // const response = await api.isAuthenticated(payload)
        // // console.log(response)
        // if (response) {
        //     this.setState({
        //         user : response.data.data.parentName,
        //         isAuthenticated : true,
        //         isLoaded : true
        //     })
        // }
    }


    render() {
        return (
            <AuthContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthProvider



// export default ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isLoaded, setIsLoaded] = useState(true);

//     useEffect(() => {
//         // const id = localStorage.getItem('currentUser')
//         // const payload = {id : id}
//         // const response = api.isAuthenticated(payload)
//         // if (response) {
//         //     setUser(response.data.data.parentName);
//         //     setIsAuthenticated(true);
//         //     setIsLoaded(true);
//         // }

//         const fetchParentData = async () => {
//             const id = localStorage.getItem('currentUser')
//             try {
//                 const payload = {id : id}
//                 const response = await api.isAuthenticated(payload)
//                 console.log(response.data.data.parentName)
//                 setUser(response.data.data.parentName);
//                 setIsAuthenticated(true);
//                 setIsLoaded(true);
//             } catch (e) {
//                 setUser(null)
//                 setIsAuthenticated(false)
//                 setIsLoaded(true)
//                 console.log(e)
//             }
//         }
//         fetchParentData()
//         console.log('line32')
//     }, []);

//     return (
//         <div>
//             {!isLoaded ? <h1>Loading</h1> :
//                 <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
//                     {children}
//                 </AuthContext.Provider>}
//         </div>
//     )
// }