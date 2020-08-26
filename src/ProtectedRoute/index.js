import React from "react";
import { Route} from "react-router-dom";
import local from "../storage/localStorage";

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        local.get("currentUser") ? (
            children
         ) 
         : 
         window.location.href='/'
      }
    />
  );
};
export default ProtectedRoute

// const ProtectedRoute = ({ component : Component, ...rest }) => {
//   const currentUser = local.get("currentUser")
//       console.log(currentUser)
//   return (
//     <Route {...rest} render = {props => {
//       if (currentUser) {
//         return (
//           <Route {...rest}
//             render= {(props) => 
//               <Component {...props}/>
//             }
//             />
//         )
//       }else if (!currentUser) {
//         window.location.href='/'
//       }
//     }}/>
//   )
// }

// export default ProtectedRoute