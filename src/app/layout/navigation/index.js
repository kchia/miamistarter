import { Link } from "react-router-dom";

import styles from "./navigation.module.css";
export default function Navigation({
  navLinksData = [
    { name: "about", path: "/about" },
    { name: "how it works", path: "/how-it-works" },
    { name: "projects", path: "/projects" },
  ],
}) {
  const navListItems = navLinksData.map(({ name, path }) => (
    <li className={styles.navLinkContainer} key={name}>
      <Link className={styles.navLink} to={path}>
        {name}
      </Link>
    </li>
  ));

  return (
    <nav>
      <ul className={styles.navBar}>{navListItems}</ul>
    </nav>
  );
}
