import styles from "../styles/Home.module.css";
import { BLOCKCHAINS, COINS } from "../sources/coinSource";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import ListComponent from "../components/ListComponent";
import Image from "next/image";

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

  const settings = {
    infinite: true,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    speed: 2000,
    arrows: false,
    autoplaySpeed: 2000,
    autoplay: true,
    pauseOnHover: false,
  };

  const coinRef = useRef();
  const blockchainRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        <input
          value={inputState}
          type='text'
          placeholder='Chains and Coins'
          onChange={(e) => setInputState(e.target.value)}
        />
        <div className={styles.searchButton} onClick={onSubmit}>
          <Image src={"/static/images/search.svg"} width='100%' height='100%' />
        </div>
      </div>
      <div className={styles.listsWrap}>
        <Slider {...settings} rtl className={styles.list} ref={blockchainRef}>
          {BLOCKCHAINS.map((item) => (
            <ListComponent key={item.id} image={item.image} name='blockchain' />
          ))}
        </Slider>
        <p className={styles.naming}>Blockchains</p>
        <Slider {...settings} className={styles.list} ref={coinRef}>
          {COINS.map((item) => (
            <ListComponent key={item.id} image={item.image} name='coin' />
          ))}
        </Slider>
        <p className={styles.naming}>Coins</p>
      </div>
    </div>
  );
}
