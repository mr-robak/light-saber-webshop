import React, { useContext, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { store } from "../store/store.js";
import DeductItem from "../components/DeductItem.js";
import AddItem from "../components/AddItem.js";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    maxWidth: 800,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function ShoppingCartPage() {
  const { state } = useContext(store);
  const classes = useStyles();

  const items = state.cart;
  console.log("ShoppingCartPage", items);

  useEffect(() => {
    const items = state.cart;
  }, [state.cart]);

  const invoiceSubtotal = items.reduce((acc, cur) => {
    return acc + cur.price * cur.amount;
  }, 0);
  const shippingCost = 24.95;
  const invoiceTotal = shippingCost + invoiceSubtotal;

  return (
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
                <TableCell align="right">{ccyFormat(price)}</TableCell>
                <TableCell align="right">
                  <AddItem id={id} /> {amount} <DeductItem id={id} />
                </TableCell>

                <TableCell align="right">{ccyFormat(price * amount)}</TableCell>
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
  );
}
