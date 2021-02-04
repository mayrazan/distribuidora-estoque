import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Contact } from "./Contact/Contact";
import { SignUp } from "./SignUp/SignUp";

export function Routes() {
  let isLogged = JSON.parse(localStorage.getItem("token"));

  return (
    <Switch>
      {isLogged !== null ? (
        <>
          <Route path="/home" component={Home} exact />
          <Route path="/contact" component={Contact} exact />
          <Redirect to="/home" />
        </>
      ) : (
        <>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Redirect to="/" />
        </>
      )}
    </Switch>
  );
}
