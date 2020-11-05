import React, { useContext } from "react";
import { store } from "../store/store.js";
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import AddStock from "./AddStock.js";
import DeductStock from "./DeductStock.js";
import Axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: { padding: 11, margin: 15 },
});

export default function Stock() {
  const { state } = useContext(store);
  const classes = useStyles();
  console.log("state.sabers", state.sabers);

  const updateStock = (e) => {
    e.preventDefault();

    Axios({
      method: "post",
      url: "http://localhost:4000/products",
      data: state.sabers,
    })
      .then(function (response) {
        if (response.status === 200) {
          alert("Stock updated successfully :)");
          // dispatch({ type: "EMPTY_CART" });
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {state.sabers.map((saber, i) => (
              <TableRow key={saber.id}>
                <TableCell component="th" scope="row">
                  {saber.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {saber.name}
                </TableCell>
                <TableCell align="right">{saber.crystal.color}</TableCell>
                <TableCell align="right">{saber.available}</TableCell>
                <AddStock id={saber.id} />
                <DeductStock id={saber.id} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={updateStock}
      >
        Save changes
      </Button>
    </div>
  );
}
