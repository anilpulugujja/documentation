import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function RoundedImage({ src, alt = '', caption, shadow = true, ...rest }) {
  return (
    <figure className={clsx(styles.frame, shadow && styles.shadowed)}>
      <img src={src} alt={alt} loading="lazy" {...rest} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
