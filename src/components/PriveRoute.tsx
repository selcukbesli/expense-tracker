import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
}

// Using type instead of interface
// type PrivateRouteProps = { component:React.FC<any>} & RouteProps

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("jwt");

        if (token) {
          return <Component {...props} />;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
};
export default PrivateRoute;
