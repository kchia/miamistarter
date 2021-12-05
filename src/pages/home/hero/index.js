import LazyHero from "react-lazy-hero";

import { Auth } from "../../../features";
import styles from "./hero.module.css";
export default function Hero() {
  return (
    <LazyHero
      opacity={0.5}
      color="#ff89b4"
      isCentered={false}
      isFixed
      imageSrc="https://source.unsplash.com/2000x1000/?miami"
      minHeight="70vh"
      className={styles.heroContainer}
    >
      <div className={styles.textOverlay}></div>
      <h2>Invest in the Miami you believe in.</h2>
      <h4>Vote on highly vetted ideas and teams based in Miami.</h4>
      <h4>Or invest with $MIA.</h4>
      <h4>
        Current Cycle Funding Pool:{" "}
        <span className={styles.fundingPoolSize}>1,000,000 ($MIA)</span>
      </h4>
      <Auth displayWalletInfo={false} />
    </LazyHero>
  );
}
