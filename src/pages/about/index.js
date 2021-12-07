import { Link } from "react-router-dom";
import styles from "./about.module.css";
export default function AboutPage() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About</h2>

      <h3>
        MiamiCoin ($MIA) has the potential to help Miami become the next tech
        hub...
      </h3>
      <p>
        Talent and capital have often been cited as barriers to Miami's growth
        as the next tech hub. To become the next tech hub, Miami needs to
        attract and retain more tech talent in the city.
      </p>

      <p>
        Startups and tech workers are attracted to investment potential and
        innovation networks.
      </p>

      <p>
        MiamiCoin’s contributions to Miami's treasury have grown to tens of
        millions of dollars, and some of these funds could be used to
        incentivize tech entrepreneurs.
      </p>

      <h3>Enter MiamiStarter...</h3>
      <p>
        Miamistarter is a Web 3.0 app that allows $MIA token holders to vote on
        and/or invest in innovative crypto and tech startups based in Miami.
      </p>
      <p>
        By voting for their favorite projects on MiamiStarter, $MIA token
        holders signal to the city which projects they think the city should
        support with the funds it receives via $MIA mining, thereby helping the
        city determine how to deploy part of its crypto treasury to attract
        crypto founders and other tech entrepreneurs to Miami and growing
        Miami's tech ecosystem.
      </p>

      <p>
        MiamiStarter also requires voters to hold $MIA tokens to be eligible to
        participate in the voting process, thereby creating an incentive for
        people to hold $MIA and contributing to MiamiCoin adoption in the city.
      </p>

      <h3>About CityCoins</h3>
      <p>
        $MIA is built on top of CityCoins, and it can be mined, held, stacked to
        earn Stacks(STX), borrowed, lent, and programmed.
      </p>
      <p>
        The CityCoins protocol empowers urban communities worldwide to play an
        active role in how their cities are run, and offers a way for people to
        support their favorite cities.
      </p>
      <p>
        The CityCoins protocol, which is built on Stacks, enables smart
        contracts on the Bitcoin network. People can support their favorite
        cities by mining the city's tokens (e.g., MiamiCoin/MIA for Miami) with
        STX. 30% of the mining rewards, in STX, are sent to the city's reserve
        wallet, and the city can claim the reward and convert the STX to USD to
        be used in various projects (e.g., infrastructure, events, etc.) to
        improve the city.
      </p>
      <p>
        CityCoins are decentralized, programmable, and built on open-source
        software. They can be applied to a wide range of novel use cases, such
        as apps for access control to digital or physical spaces, trading,
        lending, smart contract execution, and more.
      </p>
      <p>
        Read more about <Link to="/how-it-works">how MiamiStarter works.</Link>
      </p>
    </section>
  );
}
