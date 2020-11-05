import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link, NavLink, useHistory } from "react-router-dom";
import { store } from "../store/store.js";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { Badge } from "@material-ui/core";

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
  const history = useHistory();

  const classes = useStyles();

  const { state, dispatch } = useContext(store);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
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
              Lightsabres Deluxe B.V.
            </NavLink>
          </Typography>
          {state.cart.length > 0 ? (
            <IconButton aria-label="cart">
              <Link to="/cart">
                <Badge badgeContent={state.cart.length} color="secondary">
                  <ShoppingCartRoundedIcon
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </Badge>
              </Link>
            </IconButton>
          ) : null}
          {!state.user ? (
            <IconButton color="inherit">
              <NavLink
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "0.8em",
                }}
                activeStyle={{
                  fontWeight: "bold",
                }}
              >
                Login
              </NavLink>
            </IconButton>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
