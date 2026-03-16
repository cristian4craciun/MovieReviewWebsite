import React, { useState } from 'react';
import MyAppBar from '../AppBar';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';

const Search = () => {
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    console.log('Initiating search with criteria:', { title, actor, director });
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, actor, director }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            try {
              const json = JSON.parse(text);
              throw new Error(json.error);
            } catch (err) {
              console.error('Server responded with non-JSON:', text);
              throw new Error(text);
            }
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Search results:', data);
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults([]);
        }
        setError(''); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error during search:', error);
        setError(error.message);
        setResults([]);
      });
  };

  return (
    <div style={{ backgroundColor: '#333', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MyAppBar />
      <Container style={{ marginTop: '0', paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Typography variant="h3" component="h1" style={{ marginTop: '0', color: '#fff', textAlign: 'center' }}>
            Search for Movies
          </Typography>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <TextField
                id="search-title"
                label="Movie Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                      color: '#fff', // Text color in input
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                    '&.Mui-focused': {
                      color: '#fff',
                    },
                    '&:hover': {
                      color: '#fff',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    color: '#fff !important',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search-actor"
                label="Actor"
                fullWidth
                value={actor}
                onChange={(e) => setActor(e.target.value)}
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
                      color: '#fff', // Text color in input
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                    '&.Mui-focused': {
                      color: '#fff',
                    },
                    '&:hover': {
                      color: '#fff',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    color: '#fff !important',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search-director"
                label="Director"
                fullWidth
                value={director}
                onChange={(e) => setDirector(e.target.value)}
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
                      color: '#fff', // Text color in input
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                    '&.Mui-focused': {
                      color: '#fff',
                    },
                    '&:hover': {
                      color: '#fff',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    color: '#fff !important',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                id="search-button"
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{
                  backgroundColor: 'black',
                  color: 'red',
                  '&:hover': {
                    backgroundColor: 'darkgray',
                    color: 'black',
                  },
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography variant="body1" color="error" style={{ marginTop: '20px', textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          <div style={{ marginTop: '20px' }}>
            {results.length > 0 ? (
              results.map((movie, index) => (
                <Paper key={index} style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#444', color: '#fff' }}>
                  <Typography variant="h5">{movie.title}</Typography>
                  <Typography variant="subtitle1">Director: {movie.director}</Typography>
                  <Typography variant="subtitle1">
                    Average Rating: {movie.averageRating ? movie.averageRating : 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    {movie.reviews ? movie.reviews.split('\n').map((review, i) => (
                      <React.Fragment key={i}>{review}<br/></React.Fragment>
                    )) : 'No reviews available'}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" style={{ color: '#fff', textAlign: 'center' }}>No results found</Typography>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Search;
