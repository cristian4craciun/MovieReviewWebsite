import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h3" color="inherit" noWrap>
        This is Sign In Page
      </Typography>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/')}
      >
        <Typography variant="h5" color="inherit" noWrap>
          Navigate to Landing Page
        </Typography>
      </Link>

      <Link
        color="inherit"
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/Home')}
      >
        <Typography variant="h5" color="inherit" noWrap>
          Navigate to Home Page
        </Typography>
      </Link>
  </div>
  )
}

export default SignIn;