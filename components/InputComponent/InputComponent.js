import styles from "./InputComponent.module.css";
import Image from "next/image";

export default function InputComponent({ value, setValue, onSubmit }) {
  return (
    <div className={styles.inputWrap}>
      <input value={value} type='text' placeholder='Chains and Coins' onChange={(e) => setValue(e.target.value)} />
      <div className={styles.searchButton} onClick={onSubmit}>
        <Image src={"/static/images/search.svg"} width='100%' height='100%' />
      </div>
    </div>
  );
}
