import { ProjectsList } from "../../features";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <ProjectsList />
    </section>
  );
}
