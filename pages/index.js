import styles from "../styles/Home.module.css";
import { BLOCKCHAINS, COINS } from "../sources/coinSource";
import { useEffect, useRef, useState } from "react";
import SliderComponent from "../components/SliderComponent/SliderComponent";
import InputComponent from "../components/InputComponent/InputComponent";

export default function Home() {
  const [inputState, setInputState] = useState("");
  const [currBlockchain, setCurrBlockChain] = useState("");
  const [currCoin, setCurrCoin] = useState("");

  useEffect(() => {
    if (inputState) {
      coinRef.current.slickPause();
      blockchainRef.current.slickPause();
    } else {
      coinRef.current.slickPlay();
      blockchainRef.current.slickPlay();
    }
  }, [inputState]);

  useEffect(() => {
    blockchainRef.current.slickGoTo(currBlockchain);
    coinRef.current.slickGoTo(currCoin);
  }, [currBlockchain, currCoin]);

  const setCoinAndBlockchain = (resCoin, idx) => {
    COINS.forEach((item, index) => (item.name === resCoin ? setCurrCoin(index) : null));
    setCurrBlockChain(BLOCKCHAINS.length - idx - 1);
    blockchainRef.current.slickPause();
    coinRef.current.slickPause();
  };
  const setBlockchain = (idx) => {
    setCurrBlockChain(BLOCKCHAINS.length - idx - 1);
    setCurrCoin("");
    blockchainRef.current.slickPause();
    coinRef.current.slickPlay();
  };
  const setDefault = () => {
    setCurrCoin("");
    setCurrBlockChain("");
    coinRef.current.slickPlay();
    blockchainRef.current.slickPlay();
  };

  const onSubmit = () => {
    for (let i = 0; i < BLOCKCHAINS.length; i++) {
      const resCoin = BLOCKCHAINS[i].coins.find((coin) => coin.toLowerCase() === inputState.toLowerCase());
      if (resCoin) {
        setCoinAndBlockchain(resCoin, i);
        return;
      } else if (BLOCKCHAINS[i].name.toLowerCase() === inputState.toLowerCase()) {
        setBlockchain(i);
        return;
      } else {
        setDefault();
      }
    }
  };

  const nameOfCoin = (coinIndex) => (coinIndex ? COINS[coinIndex].name : "Coins");
  const nameOfBlockchain = (blockchainIndex) =>
    blockchainIndex ? BLOCKCHAINS[BLOCKCHAINS.length - blockchainIndex - 1].name : "Blockchains";

  const coinRef = useRef();
  const blockchainRef = useRef();

  return (
    <div className={styles.container}>
      <InputComponent value={inputState} setValue={setInputState} onSubmit={onSubmit} />
      <div className={styles.listsWrap}>
        <SliderComponent
          rtl
          currentArray={BLOCKCHAINS}
          currentRef={blockchainRef}
          name='blockchain'
          value={nameOfBlockchain(currBlockchain)}
        />
        <SliderComponent currentArray={COINS} currentRef={coinRef} name='coin' value={nameOfCoin(currCoin)} />
      </div>
    </div>
  );
}
