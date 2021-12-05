import { Route, Switch } from "react-router-dom";
import Layout from "./layout";

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
  );
}
