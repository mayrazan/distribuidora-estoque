import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();

  function logout() {
    history.push("/");
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/home" className={classes.link}>
              Home
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/contact" className={classes.link}>
              Contato
            </NavLink>
          </Typography>

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
