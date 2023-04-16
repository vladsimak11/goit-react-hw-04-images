import css from './ImageGallery.module.css';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import {Modal} from '../Modal/Modal';
import { useState } from 'react';

export const ImageGallery = ({images}) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const getLargeImg = (image) => {
    setLargeImageURL(image);
    setShowModal(true);
  }
  
  return (
    <>
      {images && (
      <ul className={css.imageGallery}>
      <ImageGalleryItem images={images} getLargeImg={getLargeImg}/>
      </ul>)}

      {showModal && <Modal onClose = {toggleModal} >
        <img src={largeImageURL} alt=''/>
        </Modal>
      }
    </>

  )
}