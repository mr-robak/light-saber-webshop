import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { store } from "../store/store.js";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 280,
    // color: "black",
    marginTop: "15%",
  },
});

export default function AdminLogin() {
  const history = useHistory();
  const classes = useStyles();
  const { state, dispatch } = useContext(store);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ name: false, password: false });

  const submitForm = (e) => {
    console.log("event fired");
    e.preventDefault();
    if (name === "") {
      setError({ ...error, name: true });
    } else if (password === "") {
      setError({ ...error, password: true });
    } else if (!error.name && !error.password) {
      console.log("!!!!!!!!!!!");
      Axios({
        method: "post",
        url: "http://localhost:4000/admin",
        data: { name: name, password: password },
      })
        .then(function (response) {
          console.log("response", response.data);
          if (response.status === 200) {
            dispatch({
              type: "ORDERS_FETCHED",
              payload: response.data.orders,
            });

            dispatch({
              type: "PRODUCTS_FETCHED",
              payload: response.data.products,
            });

            dispatch({
              type: "USER_LOGIN",
              payload: {
                name: response.data.user.name,
                age: parseInt(response.data.user.age),
              },
            });

            setName("");
            setPassword("");
          }
        })
        .catch(function (error) {
          setError({ name: true, password: true });
          setName("");
          setPassword("");
          console.log("error", error);
        });
      console.log("order submitted");
    }
  };

  // console.log("name", name);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <TextField
            required
            id="outlined-required"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setError({ ...error, name: false });
              setName(e.target.value);
            }}
            error={error.name}
            helperText={error.name ? "Please enter your name" : null}
          />
        </Grid>{" "}
        <Grid item>
          <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setError({ ...error, name: false });
              setPassword(e.target.value);
            }}
            error={error.name}
            helperText={error.name ? "Please enter your password" : null}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => submitForm(e)}
        >
          Login as admin
        </Button>
      </Grid>
    </div>
  );
}
