import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryParamProvider } from "use-query-params";

import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";
import MoviesPage from "./pages/MoviesPage";
import GenresPage from "./pages/GenresPage";
import ActorPage from "./pages/ActorPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
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
              <Route path="/actor/:id" component={ActorPage} />
              <Route exact path="/">
                <Redirect to="/movies/now-playing" />
              </Route>
            </Switch>
          </QueryParamProvider>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
