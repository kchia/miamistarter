import { useEffect } from "react";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Row";
import Row from "react-bootstrap/Row";

import { ErrorFallback, Loader } from "../../../common/core";
import { STATUS } from "../../../common/constants";
import { logError } from "../../../common/utils";

import ProjectCard from "../card";

import {
  projectsReset,
  fetchProjects,
  selectAllProjects,
  selectFetchProjectsStatus,
} from "../projects.slice";

import styles from "./list.module.css";

export default function ProjectsList({ title, limit }) {
  const projects = useSelector(selectAllProjects);
  const status = useSelector(selectFetchProjectsStatus);
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadProjects() {
      try {
        await dispatch(
          fetchProjects({ signal: abortController.signal, limit })
        ).unwrap();
      } catch ({ message }) {
        handleError(
          new Error(
            `Sorry, we're having trouble loading the projects: ${message}`
          )
        );
      }
    }
    loadProjects();

    return () => abortController.abort();
  }, [dispatch, limit, handleError]);

  const projectsList = (
    <Row xs={1} md={3} lg={4} className={styles.row}>
      {projects.map((project, index) => (
        <Col key={`${project.title}-${index}`}>
          <ProjectCard project={project} />
        </Col>
      ))}
    </Row>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={projectsList}
        FallbackComponent={ErrorFallback}
        onReset={() => dispatch(projectsReset())}
        onError={logError}
      />
    );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {content}
    </section>
  );
}
