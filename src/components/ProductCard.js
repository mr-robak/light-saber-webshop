import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import blue from "../assets/blue1.jpg";
import green from "../assets/green1.jpg";
import red from "../assets/red1.jpg";

import { store } from "../store/store.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    // color: "black",
    margin: 10,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);

  let creditMod;
  let forceMod;

  // console.log("card props", props.data);
  const { name, crystal } = props.data;

  const assignImage = () => {
    switch (crystal.color) {
      case "blue":
        creditMod = 10;
        forceMod = 0.19;
        return blue;
      case "green":
        creditMod = 37;
        forceMod = 0.22;
        return green;
      case "red":
        creditMod = 101;
        forceMod = 0.2;
        return red;
      default:
        break;
    }
  };
  //////////////////////////////////
  // console.log("CARD!!!!!", state);
  ///////////////////////////////////

  const showPrice = () => {
    const force = state.user.age * 10;
    const forceUsage = force * forceMod;
    const price = creditMod * forceUsage;

    const addToCart = (e) => {
      console.log("dispatched", props.data.id);
      dispatch({ type: "ADD_TO_CART", payload: props.data.id });
    };

    return (
      <div>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: {price} credits
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Force usage: {forceUsage}
        </Typography>
        <Button size="small" color="primary" onClick={addToCart}>
          Add to cart
        </Button>
      </div>
    );
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          // image={`${crystal.color}1.jpg`}
          image={assignImage()}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          {!state.user ? (
            <Typography variant="body2" color="textSecondary" component="p">
              Login to show price
            </Typography>
          ) : (
            showPrice()
          )}
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
}
