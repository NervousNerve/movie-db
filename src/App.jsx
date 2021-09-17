import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryParamProvider } from "use-query-params";

import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";
import NowPlayingPage from "./pages/NowPlayingPage";
import TopRatedPage from "./pages/TopRatedPage";
import GenresPage from "./pages/GenresPage";
import ActorPage from "./pages/ActorPage";
import SearchPage from "./pages/SearchPage";
import RecentPage from "./pages/RecentPage";
import PopularPage from "./pages/PopularPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60,
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Redirect to={"/movies/now-playing"} />
              </Route>
              <Route path="/movies/now-playing">
                <NowPlayingPage />
              </Route>
              <Route path="/movies/top-rated">
                <TopRatedPage />
              </Route>
              <Route path="/movies/genres">
                <GenresPage />
              </Route>
              <Route path="/movies/search">
                <SearchPage />
              </Route>
              <Route path="/movies/recent">
                <RecentPage />
              </Route>
              <Route path="/movies/popular">
                <PopularPage />
              </Route>
              <Route path="/movies/:id">
                <MoviePage />
              </Route>
              <Route path="/actors/:id">
                <ActorPage />
              </Route>
              <Route
                render={() => {
                  console.log("404 Not Found");
                }}
              />
            </Switch>
          </QueryParamProvider>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
