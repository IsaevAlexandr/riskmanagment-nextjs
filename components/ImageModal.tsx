import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStores } from '../hooks';

import { ResponsiveImage } from './ResponsiveImage';

export const ImageModal: React.FC = observer(() => {
  const { imageModal } = useStores();
  return (
    <Dialog open={imageModal.isOpen} onClose={imageModal.onClose} keepMounted={false}>
      <DialogTitle>{imageModal.title}</DialogTitle>
      <DialogContent>
        <ResponsiveImage src={imageModal.imageSrc} alt={imageModal.alt || 'image preview'} />
      </DialogContent>
      <DialogActions>
        <Button onClick={imageModal.onClose}>Ок</Button>
      </DialogActions>
    </Dialog>
  );
});
