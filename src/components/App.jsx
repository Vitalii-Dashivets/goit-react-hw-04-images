import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchData } from 'services/fetch-api';
import { useState } from 'react';
import { useEffect } from 'react';

Notify.init({
  width: '300px',
  fontSize: '18px',
  position: 'center-top',
  timeout: '3000',
  messageMaxLength: 150,
  distance: '20px',
  showOnlyTheLastOne: true,
  warning: {
    background: '#c24f98',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,1)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setShowLoader(true);
    fetchData(searchValue, page)
      .then(fetchResult => {
        if (fetchResult.length === 0) {
          throw new Error('Sorry, no results...');
        }
        setImages(prevImages => [...prevImages, ...fetchResult]);
        setShowLoadMore(fetchResult.length === 12);
      })
      .catch(error => {
        setShowLoadMore(false);
        Notify.warning(error.message);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, [page, searchValue]);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toShowLargeImage = url => {
    toggleModal();
    setLargeImage(url);
  };

  const setAppState = value => {
    setPage(1);
    setImages([]);
    setSearchValue(value);
    setShowLoadMore(false);
  };

  return (
    <div>
      <Searchbar setAppState={setAppState} searchValue={searchValue} />
      <ImageGallery images={images} setUrlLargeImage={toShowLargeImage} />
      {showLoadMore && <Button click={onLoadMore} />}
      {showModal && (
        <Modal largeImageUrl={largeImage} onCloseModal={toggleModal} />
      )}
      {showLoader && <Loader />}
    </div>
  );
};
