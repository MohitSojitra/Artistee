import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./Screens/Signin";
import PublicRoute from "./routes/PublicRoute";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Dashboard from "./Screens/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Booking from "./Screens/Booking";

function App() {
  return (
    <Box>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={SignIn} />
          <PrivateRoute path="/artist" component={Dashboard} />
          <PrivateRoute path="/booking" component={Booking} />
        </Switch>
      </Router>
      <ToastContainer position="bottom-right" />
    </Box>
  );
}

export default App;
