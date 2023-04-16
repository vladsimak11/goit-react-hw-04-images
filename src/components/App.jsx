import css from './App.module.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import {ThreeDots} from './Loader/Loader';
import {Button} from './Button/Button';

import { useState, useEffect } from 'react';
import {fetchImages} from '../services/fetch';

export const App = () => {
  const [searchValue, setGetValueQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const createSearchValue = getValueQuery => {
    setGetValueQuery(getValueQuery);
    setCurrentPage(1);
    setImages([]);
  }

  useEffect(() => {

    if (!searchValue) {
      return;
    }

    setIsLoading(true);

    fetchImages(searchValue, currentPage)
      .then(({hits}) => {
        setImages((prevImages) => [...prevImages, ...hits]);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });

  }, [searchValue, currentPage])

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const checkLoadMore = images.length > 0;

  return (
    <>
    
    <div className={css.app}>
      <Searchbar onSubmit={createSearchValue} />
      <ImageGallery images={images} />
    </div>

    {!checkLoadMore && <div style={{
      display: 'flex',
      justifyContent: 'center'
      }}>

      <p className={css.block}>The gallery is empty. <br /> Enter the value in the search field!</p>
        
      </div>
    }

    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      }}>
      {isLoading && <ThreeDots /> }
    </div>
    
     <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      }}>
       {checkLoadMore && <Button onLoadMore={handleLoadMore} /> } 
     </div>
    </>
  );
  
};
