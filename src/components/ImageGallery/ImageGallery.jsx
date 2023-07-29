import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, setUrlLargeImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            smallImageUrl={item.webformatURL}
            largeImageUrl={item.largeImageURL}
            showImage={setUrlLargeImage}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  setUrlLargeImage: PropTypes.func.isRequired,
};
