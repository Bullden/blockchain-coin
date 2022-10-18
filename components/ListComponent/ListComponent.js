import styles from "./ListComponent.module.css";
import clsx from "clsx";
import Image from "next/image";

export default function ListComponent({ image, name }) {
  return (
    <div
      className={clsx(styles.item, {
        [styles.hex]: name === "blockchain",
        [styles.circle]: name === "coin",
      })}
    >
      <Image className={styles.image} src={`/static/images/${image}`} width='65' height='65' />
    </div>
  );
}
