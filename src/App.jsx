import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";
import MoviesPage from "./pages/MoviesPage";
import GenresPage from "./pages/GenresPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/movies/now-playing">
              <MoviesPage category="now-playing" />
            </Route>
            <Route path="/movies/popular">
              <MoviesPage category="popular" />
            </Route>
            <Route path="/movies/top-rated">
              <MoviesPage category="top-rated" />
            </Route>
            <Route path="/genres">
              <GenresPage />
            </Route>
            <Route path="/movie/:id" component={MoviePage} />
            <Route exact path="/">
              <Redirect to="/movies/now-playing" />
            </Route>
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
