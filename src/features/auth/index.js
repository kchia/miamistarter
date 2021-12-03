import { useState, useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useHistory } from "react-router-dom";

import { STATUS } from "../../common/constants";
import { Button, Loader } from "../../common/core";
import { shortenAddress } from "../../common/utils";
import useConnect, { userSession } from "../../common/hooks/useConnect";

import styles from "./auth.module.css";

export default function Auth({
  projectView = false,
  initialUserData = {
    profile: {
      stxAddress: { testnet: "" },
    },
  },
  setCanVote,
}) {
  const [userData, setUserData] = useState({ ...initialUserData });
  const [status, setStatus] = useState(STATUS.idle);
  const handleError = useErrorHandler();
  const history = useHistory();
  const { authenticate } = useConnect();

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

  const balance = 0;

  const content = projectView ? (
    <Button
      text="connect to web3 to vote on and/or invest in projects"
      handleClick={handleConnectButtonClick}
    />
  ) : status === STATUS.loading ? (
    <Loader />
  ) : status === STATUS.idle && !userSession.isUserSignedIn() ? (
    <Button text="connect to web3" handleClick={handleConnectButtonClick} />
  ) : (
    <>
      <p>Connected:{shortenAddress(userData.profile.stxAddress.testnet)}</p>
      <p>STX balance: {balance}</p>
      <Button text="log out" handleClick={handleLogoutButtonClick} />
    </>
  );

  return <section className={styles.container}>{content}</section>;
}