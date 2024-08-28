import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate , useParams } from "react-router-dom";
import { updatePassword } from '../Action/authDispatcher';
import {useDispatch, useSelector } from "react-redux";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.mashreq.com/">
        Mashreq
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Profile(props) {


  let { userId } = useParams();

  console.log('props.match.params.id', userId)
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);


  const [profile, setProfile] = React.useState({... user});

  const [error, setError] = React.useState({display: false, error: false, message: ''})


  const callback  = (payload) => {

    if(payload.success) {


      // window.location.reload();
      navigateTo('/')
      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  payload.message,
        error: 'success'
      }));

    } else {

      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  payload.message,
        error: 'error'
      }));
    }
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);



    let re = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;

    
     if(!re.test(data.get('password'))) {

      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  'A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters',
        error: 'error'
      }));
    }

    else if(data.get('password') === data.get('new_password')) {

      dispatch(updatePassword({pass: data.get('password'), userId: userId, email: user.email}, callback))

  }
    
    else {
      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  'Both Password should be match',
        error: 'error'
      }));
    }


    // let payload = {
    //   FirstName: data.get('firstName'),
    //   LastName: data.get('lastName'),
    //   cusTechRole: 'Customer',
    //   email: user.email,
    //   pass: data.get('password'),
    //   Ispromotion: data.get('promotion') ? parseInt(data.get('promotion')) : 0,
    // }

    // dispatch(updateProfile(payload, callback))
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={3}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {error.display && <Alert severity= {error.error}>{error.message}</Alert> }
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Password
            </Typography>
                      <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                 inputProps={{ minLength: 8 }}
                 required
                  fullWidth
                  name="password"
                  label="Enter new Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                 inputProps={{ minLength: 8 }}
                 required
                  fullWidth
                  name="new_password"
                  label="Enter again Password"
                  type="password"
                  id="new_password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
