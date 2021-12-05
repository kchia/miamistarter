import styles from "./button.module.css";
import PropTypes from "prop-types";
export default function Button({ text, handleClick, disabled = false }) {
  return (
    <button className={styles.button} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
