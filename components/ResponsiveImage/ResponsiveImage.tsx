import React from 'react';
import Image, { ImageProps } from 'next/image';
import { Box } from '@mui/system';

import css from './styles.module.css';

export const ResponsiveImage: React.FC<ImageProps> = (props) => {
  return (
    <Box component="div" className={css.imageContainer}>
      {props.src ? <Image layout="fill" {...props} className={css.image} /> : null}
    </Box>
  );
};
