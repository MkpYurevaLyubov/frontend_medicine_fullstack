import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { IResponsiveDialogProps } from '../../../types/interfaces';

const ResponsiveDialog: React.FC<IResponsiveDialogProps> = ({
  isOpen,
  handleClose,
  text,
  onClickYes,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#1a237e' }} onClick={onClickYes}>
            Да
          </Button>
          <Button sx={{ color: '#1a237e' }} onClick={handleClose} autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;
