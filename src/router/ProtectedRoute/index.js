import React from "react";
import { Route} from "react-router-dom";
import local from "../../storage/localStorage";


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
