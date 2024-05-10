import React from 'react';
import css from './ImageGalleryItem.module.css';
import { ImageGalleryItemProps, PicObject } from '../App.types';

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => {
          const picObject: PicObject = { picUrl: largeImageURL, picTags: tags };
          onOpenModal(picObject);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
