import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 280,
    // color: "black",
    marginTop: "15%",
  },
});

export default function LoginPage() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  console.log("name", name);

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
            // defaultValue=""
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </Grid>
        <Button variant="contained" color="primary" href="#contained-buttons">
          Login
        </Button>
        <Link to="/admin">Login as admin?</Link>
      </Grid>
    </div>
  );
}
