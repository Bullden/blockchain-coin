import styles from "./SliderComponent.module.css";
import ListComponent from "../ListComponent/ListComponent";
import Slider from "react-slick";

export default function SliderComponent({ rtl, currentArray, currentRef, name, value }) {
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

  return (
    <>
      <Slider {...settings} rtl={rtl} className={styles.list} ref={currentRef}>
        {currentArray.map((item) => (
          <ListComponent key={item.id} image={item.image} name={name} />
        ))}
      </Slider>
      <p className={styles.naming}>{value}</p>
    </>
  );
}
