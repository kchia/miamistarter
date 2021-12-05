import { useLocation, useHistory } from "react-router-dom";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { Person } from "@stacks/profile";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export default function useConnect() {
  const history = useHistory();
  const location = useLocation();

  function authenticate() {
    showConnect({
      appDetails: {
        name: "MiamiStarter",
        icon: "https://minecitycoins.com/CityCoins_Logo_150x150.png",
      },
      redirectTo: "/projects",
      onFinish: () => {
        if (!location.pathname.includes("projects")) {
          history.push("/projects");
        }
        window.location.reload();
      },
      userSession,
    });
  }

  function getUserData() {
    return userSession.loadUserData();
  }

  function getPerson() {
    return new Person(getUserData().profile);
  }

  return { authenticate, getPerson, getUserData };
}
