import css from './App.module.css';
import {Searchbar} from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { useState } from 'react';

export const App = () => {
  const [getValueQuery, setGetValueQuery] = useState('');

  const createSearchValue = (getValueQuery) => {
    setGetValueQuery(getValueQuery);
  }

  return (
    <div className={css.app}>
      <Searchbar createSearchValue={createSearchValue} />
      <ImageGallery searchValue={getValueQuery} />
    </div>
  );
  
};
