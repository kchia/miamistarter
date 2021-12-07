import styles from "./how-it-works.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>How it works</h2>
      <p>
        Funding would be determined in 30-day cycles. Prior to the start of each
        funding cycle, entrepreneurs would post their projects on MiamiStarter.
        The city would also release a set amount of funding into a smart
        contract on the Stacks blockchain (1,000,000 STX tokens for the current
        funding cycle).
      </p>
      <p>
        Then during each cycle, $MIA token holders review and vote on project
        proposals featured on MiamiStarter. To do so, users must possess a
        Stacks wallet, such as the Hiro wallet, that holds a minimum balance of
        $MIA tokens.
      </p>
      <p>
        To start, each user can only cast one vote for each funding cycle. As
        the MiamiStarter platform grows, more sophisticated voting mechanisms
        can be considered, such as allocating votes based on the amount of $MIA
        held in a user's wallet.
      </p>
      <p>
        Besides voting, users can directly invest in projects using STX tokens.
        If they meet certain investment thresholds, then they could be eligible
        to mint limited edition NFTs that give them access to special perks.
      </p>
      <p>
        At the end of each cycle, each project would receive an amount of $MIA
        token that is proportional to the number of votes on their projects.
        Suppose a project received 200 votes out of a possible 1000 total votes
        in a given cycle; in this case the startup is eligible to receive 20% of
        the funding pool. The $MIA tokens can either be cashed out to US dollars
        to fund immediate needs or stacked to earn a yield in $BTC/$STX and
        cashed out later on.
      </p>

      <p>
        A smart contract, built on top of Stacks protocol, keeps track of the
        votes received by each project and automates the deposit, transfer, and
        withdrawal of funds for the whole funding process.
      </p>

      <section>
        <h3>How to use MiamiStarter</h3>
        <ol>
          <li>
            Install the <a href="https://www.hiro.so/wallet">Hiro Wallet</a>,
            which is a Stacks wallet. The wallet allows you to connect to
            MiamiStarter using your digital assets and identity.
          </li>
          <li>
            <a href="https://www.citycoins.co/miamicoin">
              Acquire MiamiCoin ($MIA)
            </a>{" "}
            either by buying from okcoin.com or by mining.
          </li>
          <li>
            Login to MiamiStarter with your wallet, which must have some $MIA
            tokens.
          </li>
          <li>Vote on or invest directly in projects with $MIA.</li>
        </ol>
      </section>
    </section>
  );
}
