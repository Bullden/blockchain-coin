import styles from "../styles/Home.module.css";
import { BLOCKCHAINS, COINS } from "../sources/coinSource";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import ListComponent from "../components/ListComponent";
import Image from "next/image";

export default function Home() {
  const [state, setState] = useState("");
  const [currBlockchain, setCurrBlockChain] = useState("");
  const [currCoin, setCurrCoin] = useState("");

  useEffect(() => {
    if (state) {
      coinRef.current.slickPause();
      blockchainRef.current.slickPause();
    } else {
      coinRef.current.slickPlay();
      blockchainRef.current.slickPlay();
    }
  }, [state]);

  useEffect(() => {
    blockchainRef.current.slickGoTo(currBlockchain);
    coinRef.current.slickGoTo(currCoin);
  }, [currBlockchain, currCoin]);

  const onSubmit = () => {
    for (let i = 0; i < BLOCKCHAINS.length; i++) {
      const resCoin = BLOCKCHAINS[i].coins.find((coin) => coin.toLowerCase() === state.toLowerCase());
      if (resCoin) {
        COINS.forEach((item, index) => (item === resCoin ? setCurrCoin(index) : null));
        setCurrBlockChain(BLOCKCHAINS.length - i);
        blockchainRef.current.slickPause();
        coinRef.current.slickPause();
        return;
      } else if (BLOCKCHAINS[i].name.toLowerCase() === state.toLowerCase()) {
        setCurrBlockChain(BLOCKCHAINS.length - i);
        setCurrCoin("");
        blockchainRef.current.slickPause();
        coinRef.current.slickPlay();
        return;
      } else {
        setCurrCoin("");
        setCurrBlockChain("");
        coinRef.current.slickPlay();
        blockchainRef.current.slickPlay();
      }
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: 3,
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
        <input value={state} type='text' placeholder='Chains and Coins' onChange={(e) => setState(e.target.value)} />
        <div className={styles.searchButton} onClick={onSubmit}>
          <Image src={"/static/images/search.svg"} width='100%' height='100%' />
        </div>
      </div>
      <div className={styles.listsWrap}>
        <Slider {...settings} rtl className={styles.list} ref={blockchainRef}>
          {BLOCKCHAINS.map((item, index) => (
            <ListComponent key={index} item={item.name} name='blockchain' />
          ))}
        </Slider>
        <Slider {...settings} className={styles.list} ref={coinRef}>
          {COINS.map((item, index) => (
            <ListComponent key={index} item={item} name='coin' />
          ))}
        </Slider>
      </div>
    </div>
  );
}
