import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, NavLink } from "react-router-dom";
import { store } from "../store/store.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const { state, dispatch } = useContext(store);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              activeStyle={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              PON Lightsabres B.V.
            </NavLink>
          </Typography>
          {!state.user ? (
            <Button color="inherit">
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "yellow",
                }}
              >
                Login
              </NavLink>
            </Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
          {/* <Button color="inherit" onClick={logout}>
            Logout
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
