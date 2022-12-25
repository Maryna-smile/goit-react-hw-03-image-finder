import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

export const ImageGallery = ({img, getBigImg}) => {
  return (
    <div className={css.Container}>
    <ul className={css.ImageGallery}>
 {img.map(({id, webformatURL, largeImageURL}) => {
    return (<ImageGalleryItem key={id} imgS={webformatURL} imgL={largeImageURL} getBigImg={getBigImg}/>)
 })}
  </ul>
  </div>
  )
}
