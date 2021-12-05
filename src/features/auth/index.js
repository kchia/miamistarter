import { useState, useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useHistory } from "react-router-dom";

import { STATUS } from "../../common/constants";
import { Button, Loader } from "../../common/core";
import { shortenAddress } from "../../common/utils";
import useConnect, { userSession } from "../../common/hooks/useConnect";
import useStx from "../../common/hooks/useStx";

import styles from "./auth.module.css";

export default function Auth({
  projectView = false,
  initialUserData = {
    profile: {
      stxAddress: { testnet: "" },
    },
  },
  setCanVote,
  displayWalletInfo = true,
}) {
  const [userData, setUserData] = useState({ ...initialUserData });
  const [status, setStatus] = useState(STATUS.idle);
  const [balance, setBalance] = useState(0);
  const handleError = useErrorHandler();
  const history = useHistory();
  const { authenticate } = useConnect();
  const { getAccountBalance } = useStx();

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, [status]);

  useEffect(() => {
    async function getAccountBalanceOnTestnet() {
      if (userSession.isUserSignedIn()) {
        try {
          const userData = userSession.loadUserData();
          const stxAddress = userData.profile.stxAddress.testnet;
          const balances = await getAccountBalance(stxAddress);
          setBalance(balances.stx.balance / 1000000);
        } catch (error) {
          handleError(error);
        }
      }
    }
    getAccountBalanceOnTestnet();
  }, [getAccountBalance, handleError]);

  async function handleConnectButtonClick() {
    try {
      setStatus(STATUS.loading);
      await authenticate();
    } catch (error) {
      handleError(new Error(error.message));
    } finally {
      setStatus(STATUS.idle);
    }
  }

  async function handleLogoutButtonClick() {
    try {
      userSession.signUserOut(window.location.origin);
      setUserData({});
      history.push("/");
    } catch (error) {
      handleError(new Error("Sorry, we're having trouble logging out."));
    }
  }

  const content = projectView ? (
    <>
      <Button text="connect to web3" handleClick={handleConnectButtonClick} />
      <p className={styles.connectText}>
        You must first connect your wallet to vote on and/or invest in projects
      </p>
    </>
  ) : status === STATUS.loading ? (
    <Loader />
  ) : status === STATUS.idle && !userSession.isUserSignedIn() ? (
    <Button text="connect to web3" handleClick={handleConnectButtonClick} />
  ) : (
    <>
      {displayWalletInfo && (
        <>
          <p>Connected:{shortenAddress(userData.profile.stxAddress.testnet)}</p>
          <p>STX balance: {balance}</p>
        </>
      )}
      <Button text="log out" handleClick={handleLogoutButtonClick} />
    </>
  );

  return <section className={styles.container}>{content}</section>;
}
