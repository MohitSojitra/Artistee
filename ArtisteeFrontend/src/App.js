import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Music from "./pages/Music/Music";
import MusicDetail from "./pages/MusicDetail/MusicDetail";
import {Box} from '@material-ui/core'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Box
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Music} />
          <Route path="/:id" component={MusicDetail} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
