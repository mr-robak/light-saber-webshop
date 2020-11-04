import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import blue from "../assets/blue1.jpg";
import green from "../assets/green1.jpg";
import red from "../assets/red1.jpg";

import { store } from "../store/store.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(80),
    },
  },
}));

export default function ProductPage(params) {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  const { id } = params.match.params;

  let creditMod;
  let forceMod;

  // console.log("card props", props.data);
  // const { id, name, crystal } = props.data;

  // const assignImage = () => {
  //   switch (crystal.color) {
  //     case "blue":
  //       creditMod = 10;
  //       forceMod = 0.19;
  //       return blue;
  //     case "green":
  //       creditMod = 37;
  //       forceMod = 0.22;
  //       return green;
  //     case "red":
  //       creditMod = 101;
  //       forceMod = 0.2;
  //       return red;
  //     default:
  //       break;
  //   }
  // };
  // console.log(id);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <img source="" />
      </Paper>
    </div>
  );
}
