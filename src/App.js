import { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { store } from "./store/store.js";
import data from "./data/sabers.json";

import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";
import { makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ShoppingCartPage from "./pages/ShoppingCartPage.js";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 280,
    // color: "black",
    marginTop: "15%",
  },
  notification: {
    marginTop: 50,
    // backgroundColor: "green",
    // color: "green",
  },
});

// console.log("!!!!!!!!!!!!!!!", data);

function App() {
  const classes = useStyles();

  const { state, dispatch } = useContext(store);
  // console.log("App", state);

  useEffect(() => {
    Axios.get("http://localhost:4000/products ")
      .then(function (response) {
        dispatch({ type: "PRODUCTS_FETCHED", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dispatch]);

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };

  const [open, setOpen] = useState(true);

  const handleClose = (e) => {
    setTimeout(setOpen(false), 3000);
  };

  console.log("APP RENDERED");

  const notificationAlert = () => {
    if (!state.user) {
      // setOpen(true);
      console.log("state.user", state.user);
      return null;
    }

    return (
      <Snackbar
        className={classes.notification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        // autoHideDuration={6000}
        // onClose={(e) => setOpen(false)}
        // message={}
        // key={"logged in"}
        onClose={handleClose}
      >
        <MuiAlert severity="success">
          {/* `You are logged in, ${state.user.name}` */}
          TEST
        </MuiAlert>
      </Snackbar>
    );
  };

  return (
    <div className="App">
      {/* <header className="App-header">
       
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <NavBar />
      {/* <p>Login successful</p>  */}
      {state.user ? notificationAlert() : null}
      <Switch>
        <Route path="/cart" component={ShoppingCartPage} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
