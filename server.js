import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// API to read movies from the database
app.post('/api/getMovies', (req, res) => {
    let connection = mysql.createConnection(config);

    const sql = `SELECT id, name, year FROM movies`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error fetching movies:', error.message);
            return res.status(500).json({ error: 'Error fetching movies from the database' });
        }
        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

// API to add a review to the database
app.post('/api/addReview', (req, res) => {
    const { userID, movieID, reviewTitle, reviewContent, reviewScore } = req.body;

    let connection = mysql.createConnection(config);

    const sql = `INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) 
                 VALUES (?, ?, ?, ?, ?)`;

    const data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            console.error("Error adding review:", error.message);
            return res.status(500).json({ error: "Error adding review to the database" });
        }

        return res.status(200).json({ success: true });
    });
    connection.end();
});

// API to fetch reviews for a movie from the database
app.post('/api/getReviews', (req, res) => {
    const { movieID } = req.body;

    let connection = mysql.createConnection(config);

    const sql = `SELECT userID, reviewTitle, reviewContent, reviewScore FROM Review WHERE movieID = ?`;

    const data = [movieID];

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            console.error("Error fetching reviews:", error.message);
            return res.status(500).json({ error: "Error fetching reviews from the database" });
        }

        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

// API to search movies by title, actor, and director
app.post('/api/search', (req, res) => {
    const { title, actor, director } = req.body;

    let query = `
      SELECT 
        movies.id,
        movies.name AS title, 
        GROUP_CONCAT(DISTINCT CONCAT(directors.first_name, ' ', directors.last_name) SEPARATOR ', ') AS director, 
        GROUP_CONCAT(DISTINCT CONCAT(actors.first_name, ' ', actors.last_name) SEPARATOR ', ') AS actor,
        AVG(Review.reviewScore) AS averageRating,
        GROUP_CONCAT(DISTINCT Review.reviewContent SEPARATOR '\n') AS reviews
      FROM 
        movies 
      LEFT JOIN 
        movies_directors ON movies.id = movies_directors.movie_id 
      LEFT JOIN 
        directors ON movies_directors.director_id = directors.id 
      LEFT JOIN 
        roles ON movies.id = roles.movie_id
      LEFT JOIN 
        actors ON roles.actor_id = actors.id
      LEFT JOIN 
        Review ON movies.id = Review.movieID 
      WHERE 1=1`;

    const params = [];
    if (title) {
      query += ' AND movies.name LIKE ?';
      params.push(`%${title}%`);
    }
    if (actor) {
      query += ' AND CONCAT(actors.first_name, " ", actors.last_name) LIKE ?';
      params.push(`%${actor}%`);
    }
    if (director) {
      query += ' AND CONCAT(directors.first_name, " ", directors.last_name) LIKE ?';
      params.push(`%${director}%`);
    }

    query += ' GROUP BY movies.id';

    console.log('Executing query:', query);
    console.log('With parameters:', params);

    let connection = mysql.createConnection(config);
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error('Query Error:', error);
        res.status(500).json({ error: 'An error occurred while querying the database.', details: error.message });
      } else {
        console.log('Query results:', results);
        res.json(results); // Ensure results are returned as JSON array
      }
    });
    connection.end();
});

// API to search for movie trailers by title
app.post('/api/searchTrailer', (req, res) => {
  const { title } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `SELECT trailer_link FROM movie_trailers WHERE movie_id = (SELECT id FROM movies WHERE name = ?)`;

  connection.query(sql, [title], (error, results) => {
    if (error) {
      console.error('Error fetching trailer:', error.message);
      return res.status(500).json({ error: 'Error fetching trailer from the database' });
    }

    if (results.length > 0) {
      const trailerLink = results[0].trailer_link;
      // Construct YouTube embed URL
      const embedUrl = trailerLink.includes('youtube.com/watch?v=') 
        ? `https://www.youtube.com/embed/${trailerLink.split('v=')[1].split('&')[0]}`
        : trailerLink;
      res.json({ trailer_link: embedUrl });
    } else {
      res.json({ trailer_link: '' });
    }
  });

  connection.end();
});

// API to add a comment to the comments table
app.post('/api/addComment', (req, res) => {
  const { trailerID, commentText } = req.body;

  let connection = mysql.createConnection(config);

  const sql = `INSERT INTO comments (trailer_id, comment_text) VALUES (?, ?)`;
  const data = [trailerID, commentText];

  connection.query(sql, data, (error, results) => {
    if (error) {
      console.error('Error adding comment:', error.message);
      return res.status(500).json({ error: 'Error adding comment to the database' });
    }

    return res.status(200).json({ success: true });
  });

  connection.end();
});


// Serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
