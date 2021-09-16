import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryParamProvider } from "use-query-params";

import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";
import CategoryPage from "./pages/CategoryPage";
import GenresPage from "./pages/GenresPage";
import ActorPage from "./pages/ActorPage";
import SearchPage from "./pages/SearchPage";
import RecentPage from "./pages/RecentPage";
import TrendingPage from "./pages/TrendingPage";

import categories from "./pages/dynamic/categories";

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
                <Redirect to={`/movies/${categories[0].name}`} />
              </Route>
              {/* Dynamically add functionally similar pages */}
              {categories.map((c) => (
                <Route path={`/movies/${c.name}`} key={c.name}>
                  <CategoryPage category={c} />
                </Route>
              ))}
              <Route path="/movies/genres">
                <GenresPage />
              </Route>
              <Route path="/movies/search">
                <SearchPage />
              </Route>
              <Route path="/movies/recent">
                <RecentPage />
              </Route>
              <Route path="/movies/trending">
                <TrendingPage />
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
