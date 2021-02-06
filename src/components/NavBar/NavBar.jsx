import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { Context } from "../../Context/contextAuthentication";

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

export default function NavBar({ home, contact, toHome, toContact }) {
  const classes = useStyles();
  const { handleLogout } = useContext(Context);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to={toHome} className={classes.link}>
              {home}
            </NavLink>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <NavLink to={toContact} className={classes.link}>
              {contact}
            </NavLink>
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
