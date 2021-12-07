import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";

import { STATUS } from "../../../common/constants";
import {
  Button,
  ErrorFallback,
  Loader,
  Modal as VoteModal,
} from "../../../common/core";
import { logError } from "../../../common/utils";
import { userSession } from "../../../common/hooks/useConnect";
import useStx from "../../../common/hooks/useStx";

import Auth from "../../auth";

import {
  projectReset,
  selectProject,
  fetchProject,
  selectFetchProjectStatus,
} from "../project.slice";

import { read as readFunds } from "../funds.service.js";

import styles from "./view.module.css";

export default function ProjectView() {
  const project = useSelector(selectProject);
  const status = useSelector(selectFetchProjectStatus);
  const [funds, setFunds] = useState({
    totalVotes: "",
  });
  const [canVote, setCanVote] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const { getAccountBalance, balanceHasCoin } = useStx();

  const { id } = useParams();
  const handleError = useErrorHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadProject() {
      try {
        await dispatch(
          fetchProject({ id, signal: abortController.signal })
        ).unwrap();

        setFunds(await readFunds());
      } catch ({ message }) {
        handleError(
          new Error(
            `Sorry, we're having trouble loading the project: ${message}`
          )
        );
      }
    }
    loadProject();

    return () => abortController.abort();
  }, [id, dispatch, handleError]);

  useEffect(() => {
    async function getAccountBalanceOnTestnet() {
      if (userSession.isUserSignedIn()) {
        try {
          const userData = userSession.loadUserData();
          const stxAddress = userData.profile.stxAddress.testnet;
          const balances = await getAccountBalance(stxAddress);
          setCanVote(balanceHasCoin("MIA", balances));
        } catch (error) {
          handleError(error);
        }
      }
    }
    getAccountBalanceOnTestnet();
  }, [getAccountBalance, balanceHasCoin, setCanVote, handleError]);

  const {
    logo,
    title,
    tagline,
    description,
    slug,
    fundingGoal,
    fundingPercentage,
    fundingRaised,
    voteCount,
    perks,
    solutionDescription,
    problemDescription,
    businessModelDescription,
    businessModelCharts,
    marketDescription,
    marketReports,
    team,
    websiteUrl,
    twitterUrl,
    whitepapers,
  } = project;

  const { deadline = "", totalVotes } = funds;

  function handleVoteNowButtonClick() {
    setShowVoteModal(true);
  }

  function handleVoteModalCancelButtonClick() {
    setShowVoteModal(false);
  }

  function handleVoteModalConfirmButtonClick() {
    // call to Stacks smart contract
    // show loading spinner
    setShowVoteModal(false);
  }
  const productCarousel = (
    <Carousel className={styles.carouselContainer}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://source.unsplash.com/800x600/?startup"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>vitae elit libero</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://source.unsplash.com/800x600/?miami"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>consectetur adipiscing</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://source.unsplash.com/800x600/?technology"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>vel scelerisque nisl</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );

  const productView = (
    <section>
      <h2>Product</h2>
      {productCarousel}
      {solutionDescription.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );

  const problemView = (
    <section>
      <h2>Problem</h2>
      {problemDescription.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );

  const businessModelView = (
    <section>
      <h2>Business Model</h2>
      <Row md={3} className={styles.businessModelRowContainer}>
        {businessModelCharts.map((chart, index) => (
          <img key={`${chart}-${index}`} src={chart} alt={chart} />
        ))}
      </Row>
      {businessModelDescription.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );

  const marketView = (
    <section>
      <h2>Market</h2>
      {marketDescription.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {marketReports.map((url, index) => (
          <li key={`${url}-${index}`}>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </section>
  );
  const teamView = (
    <section>
      <h2>Team</h2>
      <ul>
        <Row md={3}>
          {team.map(({ firstName, lastName, imageUrl, title }, index) => (
            <li
              className={styles.teamPersonContainer}
              key={`${firstName}-${index}`}
            >
              <img
                className={styles.teamImg}
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
              />
              <p className={styles.teamPersonName}>
                {firstName} {lastName}
              </p>
              <p className={styles.teamJobTitle}>{title}</p>
            </li>
          ))}
        </Row>
      </ul>
    </section>
  );

  const aboutView = (
    <section>
      <h2>About</h2>
      <div>
        <a href={websiteUrl}>website</a>
      </div>
      <div>
        <a href={twitterUrl}>twitter</a>
      </div>
      <h3>Whitepapers</h3>
      <ul>
        {whitepapers.map((whitepaper, index) => (
          <li key={`${whitepaper}-${index}`}>
            <a href={whitepaper}>Whitepaper {index + 1}</a>
          </li>
        ))}
      </ul>
    </section>
  );

  const votePercentage = Math.floor(
    (parseInt(voteCount) / parseInt(totalVotes.split(",").join(""))) * 100
  );

  const voteButton = canVote ? (
    <div className={styles.voteButtonContainer}>
      <Button text="vote now" handleClick={handleVoteNowButtonClick} />
    </div>
  ) : (
    <div className={styles.voteNowContainer}>
      <p>
        You need to <a href="https://minemiamicoin.com/">hold some $MIA</a> in
        your wallet to cast a vote
      </p>
      <Button text="vote now" disabled />
    </div>
  );

  const actionCard = userSession.isUserSignedIn() ? (
    <Card className={`${styles.card} sticky-top`}>
      <Card.Body>
        <Card.Title>
          <h3 className="text-center">vote</h3>
        </Card.Title>
        <Card.Text>
          <span className="funding-raised">{fundingRaised}</span> of{" "}
          {fundingGoal} in STX raised
        </Card.Text>
        <Card.Text>
          {voteCount}/{totalVotes} votes{" "}
          <span className="funding-raised">({votePercentage}%)</span>
        </Card.Text>
        <ProgressBar now={fundingPercentage} label={`${fundingPercentage}%`} />
        {voteButton}
        <Card.Text className="text-center h6">
          Deadline: {deadline.split("T")[0]}
        </Card.Text>
      </Card.Body>
      <Card.Body className="text-center">
        <Card.Title>
          <h3 className="text-center">invest (coming soon!)</h3>
        </Card.Title>
        <Button text="invest with stx" disabled />
      </Card.Body>
      <Card.Body className="text-center">
        <Card.Title>
          <h3 className="text-center">mint a perk (coming soon!)</h3>
        </Card.Title>
        <Card.Text className="h5">
          Mint limited edition NFTs when you invest above a certain amount
        </Card.Text>
        <ul>
          {perks.map(
            ({ imageUrl, name, description, total, claimed }, index) => (
              <li className={`${styles.listItem} h6`} key={`${name}-${index}`}>
                <img className={styles.perkImg} src={imageUrl} alt={name} />
                <span>{name}</span>
                <span>
                  {claimed} of {total} claimed
                </span>
                <Button text="mint" disabled />
              </li>
            )
          )}
        </ul>
      </Card.Body>
    </Card>
  ) : (
    <Auth projectView />
  );

  const projectView = (
    <Container fluid>
      <Row>
        <Col md={8}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">home</Breadcrumb.Item>
            <Breadcrumb.Item href="/projects">projects</Breadcrumb.Item>
            <Breadcrumb.Item href={`/projects/${id}`}>{slug}</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.logoContainer}>
            <img className={styles.projectViewLogo} src={logo} alt={title} />
            <div className={styles.logoSecondaryContainer}>
              <h2>{title}</h2>
              <p>{tagline}</p>
            </div>
          </div>
          <p>{description}</p>
          {productView}
          {problemView}
          {businessModelView}
          {marketView}
          {teamView}
          {aboutView}
        </Col>
        <Col md={4}>{actionCard}</Col>
        <VoteModal
          handleClose={handleVoteModalCancelButtonClick}
          handlePrimaryButtonClick={handleVoteModalConfirmButtonClick}
          handleSecondaryButtonClick={handleVoteModalCancelButtonClick}
          heading={`Vote for ${title}`}
          body="You can only cast a vote once per funding cycle, and you cannot undo your vote, which will be recorded on the Stacks blockchain, so think carefully before confirming your vote!"
          secondaryText="cancel"
          primaryText="confirm"
          show={showVoteModal}
        />
      </Row>
    </Container>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={projectView}
        FallbackComponent={ErrorFallback}
        onReset={() => dispatch(projectReset())}
        onError={logError}
      />
    );

  return <section className={styles.container}>{content}</section>;
}
