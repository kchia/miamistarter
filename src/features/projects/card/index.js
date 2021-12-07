import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ProgressBar from "react-bootstrap/ProgressBar";

import { useHistory } from "react-router-dom";

import styles from "./card.module.css";
export default function ProjectCard({
  project: {
    id,
    imageUrl,
    logo,
    title,
    tagline,
    description,
    slug,
    fundingRaised,
    fundingGoal,
    fundingPercentage,
    labels,
  },
}) {
  const history = useHistory();

  function handleCardClick() {
    history.push(`/projects/${id}`);
  }

  const labelBadges = labels.map((label, index) => (
    <Badge key={`${label}-${index}`}>{label}</Badge>
  ));

  const content = (
    <Card className={styles.card} onClick={handleCardClick}>
      <Card.Img
        alt={title}
        className={styles.img}
        variant="top"
        src={imageUrl}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{tagline}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <span className="funding-raised">{fundingRaised}</span> of{" "}
          {fundingGoal} in STX raised
        </Card.Text>
        <ProgressBar now={fundingPercentage} label={`${fundingPercentage}%`} />
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className={styles.listGroupItem}>
          {labelBadges}
        </ListGroupItem>
      </ListGroup>
      <Card.Footer>Launching Soon</Card.Footer>
    </Card>
  );

  return content;
}
