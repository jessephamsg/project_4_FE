import React, { createContext, useState, useEffect, Component} from 'react';
import api from '../api';
import localStorage from '../storage/localStorage'
import local from '../storage/localStorage';

export const AuthContext = createContext(); // create context


// export class AuthProvider extends Component {
//     state = {
//         userid: null,
//         currentUser: null,
//         isAuthenticated : false,
//         isLoaded: false
//     }
//     async componentDidMount() {
//         const id = localStorage.get('currentID')
//         const currentUser = localStorage.get('currentUser')
//         if (id) {
//             this.setState({
//                 userid: id,
//                 currentUser :currentUser,
//                 isAuthenticated : true,
//                 isLoaded : true
//             })
//         }
//         // const payload = {id : id}
//         // const response = await api.isAuthenticated(payload)
//         // // console.log(response)
//         // if (response) {
//         //     this.setState({
//         //         user : response.data.data.parentName,
//         //         isAuthenticated : true,
//         //         isLoaded : true
//         //     })
//         // }
//     }


//     render() {
//         console.log('in authcontext line 41',this.state)
//         return (
//             <AuthContext.Provider value={{ ...this.state }}>
//                 {this.props.children}
//             </AuthContext.Provider>
//         )
//     }
// }

// export default AuthProvider


// below is using functional and react hook 
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
