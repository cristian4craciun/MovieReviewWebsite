import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyAppBar = () => (
  <AppBar position="fixed" style={{ backgroundColor: '#000', color: '#f00' }}>
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        My App
      </Typography>
      <Button color="inherit" component={Link} to="/">Landing</Button>
      <Button color="inherit" component={Link} to="/Search">Search</Button>
      <Button color="inherit" component={Link} to="/Review">Review</Button>
      <Button color="inherit" component={Link} to="/MyPage">My Page</Button>
    </Toolbar>
  </AppBar>
);

export default MyAppBar;
