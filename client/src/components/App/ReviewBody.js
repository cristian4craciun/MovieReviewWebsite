import React from 'react';
import { TextField } from '@mui/material';

function ReviewBody({ enteredReview, handleReviewChange }) {
  return (
    <TextField
      id="review-body"
      label="Enter your review"
      value={enteredReview}
      onChange={handleReviewChange}
      multiline
      rows={4}
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
          '& textarea': {
            color: 'white', // For multiline input
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white',
          '&.Mui-focused': {
            color: 'white',
          },
          '&:hover': {
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

export default ReviewBody;
