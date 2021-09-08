import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./helpers/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Login} path="/login" />
        <Route exact component={Register} path="/register" />
        <PrivateRoute exact component={Home} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
