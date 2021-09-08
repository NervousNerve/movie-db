import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NowPlaying from "./pages/NowPlaying";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/now-playing" component={NowPlaying} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
