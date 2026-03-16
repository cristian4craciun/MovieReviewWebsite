import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import MovieSelection from './MovieSelection';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';

const serverURL = "";

function Review() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
    callApiLoadMovies()
      .then(res => {
        console.log("callApiLoadMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }

  const callApiLoadMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  const handleMovieChange = (movie) => {
    setSelectedMovie(movie);
    setErrors((prevErrors) => ({ ...prevErrors, selectedMovie: false }));
    setShowConfirmation(false);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, enteredTitle: false }));
    setShowConfirmation(false);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, enteredReview: false }));
    setShowConfirmation(false);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, selectedRating: false }));
    setShowConfirmation(false);
  };

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = {};

    if (!selectedMovie) {
      newErrors.selectedMovie = true;
      hasErrors = true;
    }
    if (!enteredTitle) {
      newErrors.enteredTitle = true;
      hasErrors = true;
    }
    if (!enteredReview) {
      newErrors.enteredReview = true;
      hasErrors = true;
    }
    if (!selectedRating) {
      newErrors.selectedRating = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setShowConfirmation(false);
    } else {
      // Prepare the review data to send to the server
      const reviewData = {
        userID: 1,
        movieID: selectedMovie.id,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating
      };

      // Send the review data to the server using POST request
      callApiAddReview(reviewData)
        .then(res => {
          console.log("callApiAddReview response: ", res);
          setShowConfirmation(true);
          setErrors({});
        })
        .catch(error => {
          console.error("Error adding review:", error.message);
          // Handle any error that occurred during the review submission
        });
    }
  };

  const callApiAddReview = async (reviewData) => {
    const url = serverURL + "/api/addReview";
    console.log("Sending review data to:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  return (
    <div style={{ backgroundColor: '#333', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
      <Grid container spacing={2} style={{ marginTop: 0, maxWidth: '600px', width: '100%', padding: '20px', backgroundColor: '#333', borderRadius: '8px' }}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">Review a Movie</Typography>
        </Grid>
        <Grid item xs={12}>
          <MovieSelection
            movies={movies}
            selectedMovie={selectedMovie}
            handleMovieChange={handleMovieChange}
          />
          {errors.selectedMovie && <Typography color="error" align="center">Select your movie</Typography>}
        </Grid>
        <Grid item xs={12}>
          <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} />
          {errors.enteredTitle && <Typography color="error" align="center">Enter your review title</Typography>}
        </Grid>
        <Grid item xs={12}>
          <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} />
          {errors.enteredReview && <Typography color="error" align="center">Enter your review</Typography>}
        </Grid>
        <Grid item xs={12}>
          <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} />
          {errors.selectedRating && <Typography color="error" align="center">Select the rating</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ backgroundColor: 'black', color: 'red', width: '100%' }}
            onClick={handleSubmit}
            id="submit-button"
          >
            Submit
          </Button>
        </Grid>
        {showConfirmation && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" id="confirmation-message">Your review has been received</Typography>
            <Typography variant="subtitle1" align="center">Movie: {selectedMovie.name}</Typography>
            <Typography variant="subtitle1" align="center">Review Title: {enteredTitle}</Typography>
            <Typography variant="subtitle1" align="center">Review Body: {enteredReview}</Typography>
            <Typography variant="subtitle1" align="center">Rating: {selectedRating}</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Review;
