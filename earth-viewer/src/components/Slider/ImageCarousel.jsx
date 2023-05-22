import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-styles.css';

const images = [
  './earthImages/1.jpg',
  './earthImages/2.jpg',
  './earthImages/3.jpg',
  './earthImages/4.jpg',
  './earthImages/5.jpg',
  './earthImages/6.jpg',
];

const ImageCarousel = () => {
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const sliderContainerStyle = {
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        position: 'relative',
    };

    const imageStyle = {
        display: 'inline-block',
        width: '100%',
        height: 'calc(90vh - 100px)', // Adjust the height as needed, subtracting any necessary space for other elements
        objectFit: 'cover',
    };

  return (
    <div style={sliderContainerStyle}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt="" style={imageStyle} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
