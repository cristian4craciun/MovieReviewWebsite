import React, { useState } from 'react';
import MyAppBar from '../AppBar';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';

const MyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [comment, setComment] = useState('');

  const trailerID = 1;

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/searchTrailer', { title: searchQuery });
      const trailerLink = response.data.trailer_link;

      if (trailerLink) {
        // Set the trailer URL directly as the embed URL
        setTrailerUrl(trailerLink);
      } else {
        setTrailerUrl('');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setTrailerUrl('');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post('/api/addComment', { trailerID, commentText: comment });
      setComment(''); // Clear the comment field after submission
      // Optionally, show a success message or perform other actions here
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#333', minHeight: '100vh', color: '#fff' }}>
      <MyAppBar />
      <Container style={{ marginTop: '0px', padding: '200px' }}>
        <Typography variant="h3" component="h1" style={{ color: '#fff', textAlign: 'center' }}>
          Movie Trailer Search
        </Typography>
        <Grid container spacing={3} style={{ marginTop: '20px', justifyContent: 'center' }}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              id="search-movie"
              label="Movie Name"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#fff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                  '& input': {
                    color: '#fff',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#fff',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'red', width: '100%', fontSize: '14px' }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
          {trailerUrl && (
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="h6" component="p">
                Trailer:
              </Typography>
              <iframe
                width="700"
                height="400"
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <Typography variant="h6" component="h2" style={{ marginTop: '20px' }}>
                Add a Comment:
              </Typography>
              <TextField
                id="comment"
                label="Your Comment"
                multiline
                rows={4}
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                    '& input': {
                      color: '#fff',
                    },
                    '& textarea': { // Add this to ensure the text inside the textarea is also white
                      color: '#fff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                    '&.Mui-focused': {
                      color: '#fff',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: 'black', color: 'red', marginTop: '10px' }}
                onClick={handleCommentSubmit}
              >
                Submit Comment
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default MyPage;
