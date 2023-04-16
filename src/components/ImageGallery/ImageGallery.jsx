import { useEffect, useState } from 'react';
import css from './ImageGallery.module.css';
import {fetchImages} from '../../services/fetch';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import {Button} from '../Button/Button';
import {ThreeDots} from '../Loader/Loader';
import {Modal} from '../Modal/Modal';

export const ImageGallery = ({searchValue}) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(searchValue) {
      onResetState();
      getImages();
    }
  }, [searchValue])

  const getImages = () => {
    setIsLoading(true);
      fetchImages(searchValue, currentPage)
        .then(({hits}) => {
          setImages((prevImages) => [...prevImages, ...hits]);
          setCurrentPage((prevPage) => prevPage + 1);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });

  }

  const onResetState = () => {
    setImages([]);
    setCurrentPage(1)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const getLargeImg = (image) => {
    setLargeImageURL(image);
    setShowModal(true);
  }

  const checkLoadMore = images.length > 0;
  return (
    <>
      {!checkLoadMore && <div style={{
        display: 'flex',
        justifyContent: 'center'
        }}>

        <p className={css.block}>The gallery is empty. <br /> Enter the value in the search field!</p>
        
        </div>
      }

      {showModal && <Modal onClose = {toggleModal} >
        <img src={largeImageURL} alt=''/>
        </Modal>
      }

      {
        images && (
        <>
        <ul className={css.imageGallery}>
        <ImageGalleryItem images={images} getLargeImg={getLargeImg}/>
        </ul>
        {checkLoadMore && <Button onClick={getImages}/> }
        <div className={css.loader}>
          {isLoading && <ThreeDots /> }
        </div>
        </>
        )
      }
    </>
  )
}