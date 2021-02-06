import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Contact } from "./Contact/Contact";
import { SignUp } from "./SignUp/SignUp";
import { AdminAddProducts } from "./AdminPages/AdminAddProducts";
import { AdminHome } from "./AdminPages/AdminHome";
import { Context } from "../Context/contextAuthentication";
import React, { useContext } from "react";
import Loading from "../components/Loading";

export function Routes() {
  const isLogged = JSON.parse(localStorage.getItem("token"));
  const { loading, authenticated } = useContext(Context);

  function CustomRoute({ isPrivate, ...rest }) {
    if (loading) {
      return <Loading />;
    }

    if (!authenticated && isPrivate) {
      localStorage.setItem("token", JSON.stringify(""));
      return <Redirect to="/" />;
    }

    return <Route {...rest} />;
  }

  return (
    <Switch>
      {!authenticated ? (
        <>
          <CustomRoute path="/" component={Login} exact />
          <CustomRoute path="/signup" component={SignUp} exact />
          <Redirect to="/" />
        </>
      ) : (
        <>
          {isLogged[0] === "user" ? (
            <>
              <CustomRoute isPrivate path="/home" component={Home} exact />
              <CustomRoute
                isPrivate
                path="/contact"
                component={Contact}
                exact
              />
              <Redirect to="/home" />
            </>
          ) : (
            <>
              <CustomRoute
                isPrivate
                path="/admin-home"
                component={AdminHome}
                exact
              />
              <CustomRoute
                isPrivate
                path="/admin-contact-form"
                component={AdminAddProducts}
                exact
              />
              <Redirect to="/admin-home" />
            </>
          )}
        </>
      )}
    </Switch>
  );
}
