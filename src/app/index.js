import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Route, Switch } from "react-router-dom";

import Layout from "./layout";
import { AppContextProvider } from "./AppContext";

function getLibrary(provider, connector) {
  return new ethers.providers.Web3Provider(provider);
}

export default function App() {
  return (
    <AppContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Switch>
          <Route path="/">
            <Layout />
          </Route>
        </Switch>
      </Web3ReactProvider>
    </AppContextProvider>
  );
}
