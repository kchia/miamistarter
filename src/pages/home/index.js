import Hero from "./hero";
import { ProjectsList } from "../../features";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <ProjectsList title="Popular Projects Launching Soon..." limit={7} />
    </section>
  );
}
