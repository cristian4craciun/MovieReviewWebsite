import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

function ReviewRating({ selectedRating, handleRatingChange }) {
  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      <RadioGroup id="review-rating" value={selectedRating} onChange={handleRatingChange} row>
        {['1', '2', '3', '4', '5'].map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'white',
                  },
                }}
              />
            }
            label={value}
            sx={{
              '& .MuiFormControlLabel-label': {
                color: 'white',
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default ReviewRating;