import React from 'react';
import { Container, Grid, Card, CardMedia, Typography } from '@mui/material';
import MyAppBar from '../AppBar';

const Landing = () => (
  <div style={{ backgroundColor: '#333', minHeight: '100vh', color: '#fff' }}> {/* Dark gray background */}
    <MyAppBar />
    <Container 
      maxWidth="lg" 
      style={{ 
        paddingTop: '80px', // Adjust padding to fit the AppBar height
        textAlign: 'center' 
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Cristian's Movie Reviews!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt="Oppenheimer"
              height="600" 
              image="/Oppenheimer.png" 
              title="Oppenheimer"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt="The Godfather"
              height="600" 
              image="/TheGodfather.png" 
              title="The Godfather"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt="The Lion King"
              height="600" 
              image="/TheLionKing.png" 
              title="The Lion King"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default Landing;
