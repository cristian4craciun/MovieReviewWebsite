import React from 'react';
import { TextField } from '@mui/material';

function ReviewTitle({ enteredTitle, handleTitleChange }) {
  return (
    <TextField
      id="review-title"
      label="Review Title"
      value={enteredTitle}
      onChange={handleTitleChange}
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
          '& input': {
            color: 'white', 
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
        },
        '& .MuiInputLabel-shrink': {
          color: 'white !important',
        },
      }}
    />
  );
}

export default ReviewTitle;
