import React from 'react';
import css from './Button.module.css';

export const Button = ({getMorePictures}) => {
  return (
    <button className={css.Button} onClick={getMorePictures}>load more</button>
  )
}
