import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
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
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/login" component={LoginPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
