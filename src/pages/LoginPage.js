import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
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

export default function LoginPage() {
  const history = useHistory();
  const classes = useStyles();
  const { state, dispatch } = useContext(store);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState({ name: false, age: false });

  const submitForm = (e) => {
    e.preventDefault();
    if (name === "") {
      setError({ ...error, name: true });
    } else if (age === "") {
      setError({ ...error, age: true });
    } else if (!error.name && !error.age) {
      dispatch({ type: "USER_LOGIN", payload: { name: name, age: age } });
      setName("");
      setAge("");
      history.push("/");
    }
  };

  const checkAge = (e) => {
    e.preventDefault();
    if (e.target.value > 140 || e.target.value <= 0) {
      setError({ ...error, age: true });
      setAge("");
    } else {
      setError({ ...error, age: false });
      setAge(e.target.value);
    }
  };

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
        </Grid>
        <Grid item>
          <TextField
            required
            id="outlined-number"
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={age}
            onChange={(e) => checkAge(e)}
            error={error.age}
            helperText={error.age ? "Enter values between 1 ... 140" : null}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => submitForm(e)}
        >
          Login
        </Button>
        <Link to="/admin">Login as admin?</Link>
      </Grid>
    </div>
  );
}
