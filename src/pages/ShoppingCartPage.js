import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, makeStyles } from "@material-ui/core";
import DeductItem from "../components/DeductItem.js";
import AddItem from "../components/AddItem.js";

import { store } from "../store/store.js";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    maxWidth: 800,
  },
  submit: { padding: 10, margin: 10 },
});

export default function ShoppingCartPage() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const classes = useStyles();

  const items = state.cart;
  // console.log("ShoppingCartPage", items);

  useEffect(() => {
    return state.cart.length === 0 ? history.push("/") : null;
  });

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  const invoiceSubtotal = items.reduce((acc, cur) => {
    return acc + cur.price * cur.amount;
  }, 0);
  const shippingCost = 24.95;
  const invoiceTotal = shippingCost + invoiceSubtotal;

  const submitOrder = () => {
    const order = { date: new Date(), user: state.user, cart: state.cart };
    Axios({
      method: "post",
      url: "http://localhost:4000/orders",
      data: order,
    })
      .then(function (response) {
        if (response.status === 200) {
          alert("Order submitted");
          dispatch({ type: "EMPTY_CART" });
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product name</TableCell>

              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => {
              const { id, name, price, amount } = item;
              return (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <AddItem id={id} /> {amount} <DeductItem id={id} />
                  </TableCell>

                  <TableCell align="right">
                    {(price * amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Table className={classes.table} style={{ maxWidth: " auto " }}>
          <TableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Shipping</TableCell>
            <TableCell align="right">{ccyFormat(shippingCost)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={submitOrder}
      >
        SUBMIT ORDER
      </Button>
    </div>
  );
}
