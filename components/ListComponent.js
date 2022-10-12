import styles from "../styles/ListComponent.module.css";
import clsx from "clsx";

export default function ListComponent({ item, name }) {
  return (
    <div
      className={clsx(styles.item, {
        [styles.hex]: name === "blockchain",
        [styles.circle]: name === "coin",
      })}
    >
      {item}
    </div>
  );
}
