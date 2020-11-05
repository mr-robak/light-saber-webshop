import { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { store } from "./store/store.js";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AdminDashboard from "./pages/AdminDashboard";
import { makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ShoppingCartPage from "./pages/ShoppingCartPage.js";
import Axios from "axios";
import "./App.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "15%",
  },
  notification: {
    marginTop: 50,
  },
});

function App() {
  const classes = useStyles();

  const { state, dispatch } = useContext(store);

  useEffect(() => {
    Axios.get("http://localhost:4000/products ")
      .then(function (response) {
        dispatch({ type: "PRODUCTS_FETCHED", payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dispatch]);

  const [open, setOpen] = useState(true);

  const handleClose = (e) => {
    setTimeout(setOpen(false), 3000);
  };

  console.log("APP RENDERED");

  const notificationAlert = () => {
    if (!state.user) {
      console.log("state.user", state.user);
      return null;
    }

    return (
      <Snackbar
        className={classes.notification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
      >
        <MuiAlert severity="success">"Login successful"</MuiAlert>
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
      {state.user ? notificationAlert() : null}
      <Switch>
        <Route path="/cart" component={ShoppingCartPage} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
