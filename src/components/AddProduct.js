import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Axios from "axios";
import { store } from "../store/store.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  formControl: { marginTop: 16 },
}));

export default function AddProduct() {
  const classes = useStyles();
  const { dispatch } = useContext(store);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [crystName, setCrystName] = useState("");
  const [color, setColor] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const planet = color === "red" ? 13 : color === "green" ? 5 : 25;
    const saber = {
      id: id,
      name: name,
      available: amount,
      crystal: { name: crystName, color: color, planet: planet },
    };

    Axios({
      method: "put",
      url: "http://localhost:4000/products",
      data: saber,
    })
      .then(function (response) {
        console.log("response NewSabres", response);
        if (response.status === 200) {
          alert("New product saved :)");
          dispatch({ type: "PRODUCTS_FETCHED", payload: response.data });
          setName("");
          setId("");
          setAmount("");
          setCrystName("");
          setColor("");
        }
      })
      .catch(function (error) {
        console.log("error", error);
        alert("Sorry, something went wrong :(");
      });
  };

  return (
    <div>
      <Typography variant="h6">
        Please enter the data for a new saber:
      </Typography>
      <TextField
        id="outlined-full-width"
        label="Saber name:"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Saber ID:"
        id="outlined-margin-normal"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />{" "}
      <TextField
        label="Stock quantity:"
        id="outlined-margin-normal"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />{" "}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Crystal colour
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          label="Color"
          style={{ width: 150 }}
        >
          <MenuItem>
            <em>{}</em>
          </MenuItem>
          <MenuItem value={"blue"}>Blue</MenuItem>
          <MenuItem value={"green"}>Green</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-full-width"
        label="Crystal name:"
        style={{ margin: 8 }}
        // helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={crystName}
        onChange={(e) => setCrystName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={(e) => submitForm(e)}
      >
        Save product
      </Button>
    </div>
  );
}
