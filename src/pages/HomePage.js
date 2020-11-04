import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { store } from "../store/store.js";
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 280,
    // color: "black",
    // marginTop: "15%",
  },
  listSubheader: {
    fontSize: "1.3em",
  },
});

export default function HomePage() {
  const { state } = useContext(store);
  const classes = useStyles();

  // console.log(state.isLoading);

  const renderCards = () => {
    return (
      <GridList cellHeight={180} className={classes.gridList}>
        {!state.user ? null : (
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div" className={classes.listSubheader}>
              Welcome {state.user.age >= 9.32 ? "Jedi " : "padawan "}
              {state.user.name}! Your force is at {state.user.age * 10} force
              units!
            </ListSubheader>
          </GridListTile>
        )}

        {state.sabers.map((product, index) => {
          // console.log("rendered at HomePage", index, product.name);
          return <ProductCard data={product} key={index} />;
        })}
      </GridList>
    );
  };

  return (
    <div className="HomePage">
      {state && state.isLoading ? <Loading /> : renderCards()}
    </div>
  );
}
