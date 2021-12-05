import { Redirect, Route, Switch } from "react-router-dom";

import { ProjectView } from "../../features";
import {
  HomePage,
  AboutPage,
  HowItWorksPage,
  ProjectsPage,
  NoMatchPage,
} from "../../pages";

import Header from "./header";
import Footer from "./footer";
import RouteWithErrorBoundary from "./route-with-error-boundary";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <RouteWithErrorBoundary path="/home">
            <HomePage />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary path="/about">
            <AboutPage />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary path="/how-it-works">
            <HowItWorksPage />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary exact path="/projects">
            <ProjectsPage />
          </RouteWithErrorBoundary>
          <RouteWithErrorBoundary path="/projects/:id">
            <ProjectView />
          </RouteWithErrorBoundary>

          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
