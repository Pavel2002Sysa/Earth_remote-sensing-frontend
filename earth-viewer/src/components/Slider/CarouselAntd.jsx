import { Carousel, Button, Pagination } from "antd";
import Image from "mui-image";
import { useState, useRef, useEffect } from "react";
import s from "./CarouselAntd.module.css";
import "./carouselStyles.css";
import { djangoApi } from "../../api/djangoApi";
import { useSelector } from "react-redux";
const Arrow = ({ direction, onClick }) => (
  <Button
    className={`${s.arrowButton} ${
      direction === "left" ? s.arrowButtonLeft : s.arrowButtonRight
    }`}
    type="primary"
    shape="circle"
    color="white"
    icon={direction === "left" ? "left" : "right"}
    onClick={onClick}
  />
);

export const CarouselAntd = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagePaths, setImagePaths] = useState([]);
  const carouselRef = useRef(null);
  const name = useSelector((state) => state.user.name);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await djangoApi.get("/ALL_Images/");
        console.log(
          "🚀 ~ file: CarouselAntd.jsx:27 ~ useEffect ~ response:",
          response
        );
        if (name) {
          setImagePaths(response.data.map((item) => item.id));
        } else {
          setImagePaths(response.data.map((item) => item.id).slice(0, 10));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchImages();
  }, []);
  const handleChange = (page) => {
    setCurrentSlide(page - 1);
    carouselRef.current.goTo(page - 1);
  };

  return (
    <div className={s.carouselWrapper}>
      <Carousel
        ref={carouselRef}
        afterChange={(current) => setCurrentSlide(current)}
        dots={false}
        nextArrow={<Arrow direction="right" />}
        prevArrow={<Arrow direction="left" />}
      >
        {imagePaths.map((item) => (
          <div
            style={{ position: "relative", width: "100%", height: "300px" }}
            key={item}
          >
            <Image
              duration={0}
              src={`/earthImages/${item}.jpg`}
              style={{ width: "100%", objectFit: "cover", height: "650px" }}
            />
          </div>
        ))}
      </Carousel>
      <Pagination
        className="carouselPagination my-custom-pagination"
        current={currentSlide + 1}
        total={imagePaths.length}
        pageSize={1}
        onChange={handleChange}
        showSizeChanger={false}
      />
    </div>
  );
};
