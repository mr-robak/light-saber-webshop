import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { store } from "../store/store.js";
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  listSubheader: {
    fontSize: "1.3em",
  },
});

export default function HomePage() {
  const { state } = useContext(store);
  const classes = useStyles();

  console.log("State @ Homepage", state);

  const renderCards = () => {
    return (
      <GridList cellHeight={180} className={classes.gridList}>
        {!state.user ? null : (
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div" className={classes.listSubheader}>
              Welcome{" "}
              {state.user.age >= 666
                ? "Lord "
                : state.user.age >= 9.2
                ? "Jedi Master "
                : "padawan "}
              {state.user.name}! Your force is at{" "}
              {state.user.age === 666 ? 666 : state.user.age * 10} force units!
            </ListSubheader>
          </GridListTile>
        )}

        {state.sabers.map((product, index) => {
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
