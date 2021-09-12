import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./common/helpers/PrivateRoute";
import Login from "./features/pages/Login";
import Register from "./features/pages/Register";
import Home from "./features/pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Login} path="/sign-in" />
        <Route exact component={Register} path="/sign-up" />
        <PrivateRoute exact component={Home} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
