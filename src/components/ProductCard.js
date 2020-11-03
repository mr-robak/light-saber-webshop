import React from "react";
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

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    // color: "black",
    margin: 10,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  // console.log("card props", props.data);
  const { name, crystal } = props.data;

  const assignImage = () => {
    switch (crystal.color) {
      case "blue":
        return blue;
      case "green":
        return green;
      case "red":
        return red;
      default:
        break;
    }
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
          <Typography variant="body2" color="textSecondary" component="p">
            crystal: {crystal.name}{" "}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            colour: {crystal.color}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
