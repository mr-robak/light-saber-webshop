import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { store } from "../store/store.js";
import Cart from "../components/Cart";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "120%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: "23.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Orders() {
  const { state } = useContext(store);

  console.log("!!!!!!!!!!!state.orders", state);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {state.orders.map((order, i) => {
        return (
          <Accordion
            expanded={expanded === `panel${i + 1}`}
            onChange={handleChange(`panel${i + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i + 1}bh-content`}
              id={`panel${i + 1}bh-header`}
            >
              {" "}
              <Typography>{i + 1}</Typography>
              <Typography className={classes.heading}>
                {order.date.slice(0, 10)}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {`Name: ${order.user.name} | age: ${
                  order.user.age
                } | Order total: ${order.cart.reduce((acc, cur) => {
                  return acc + cur.price;
                }, 0)} Cr`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              component="div"
              // style={{ display: "block" }}
            >
              {/* {order.cart.map((item, i) => {
                return (
                  <div>{`${i + 1}. Name:${item.name}....|....Amount:${
                    item.amount
                  }   |.....Price:${item.price}`}</div>
                );
              })} */}
              {<Cart data={order.cart} />}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
