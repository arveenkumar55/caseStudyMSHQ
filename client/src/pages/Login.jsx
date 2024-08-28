import * as React from 'react';
import {
  Grid, CssBaseline, Box, Avatar, Typography, TextField, Button, 
  FormControlLabel, Checkbox, Link, Paper, Alert, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from "react-router-dom";
import { signIN } from '../Action/authDispatcher';
import {useDispatch, useSelector } from "react-redux";
import {validateUsername} from '../Utils/index'
import { useThemeContext } from '../Theme/ThemeContext';


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

export default function SignInSide() {
  const navigateTo = useNavigate();
  const { theme, setCountry } = useThemeContext();
  const dispatch = useDispatch();

  const [country, setCountr] = React.useState('UAE');

  const [error, setError] = React.useState({display: false, error: false, message: ''})

  const callback  = (payload) => {

    if(payload.success) {

      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  payload.message,
        error: 'success'
      }));


      if(payload.payload.isPasswordVerifed) {
        navigateTo('/')

      }
      else {
          navigateTo('/PasswordChange')
      }
      // setTimeout(
      //   () => navigateTo('/'), 
      //   10000
      // );


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
    
    let payload = {
      email: data.get('email'),
      pass: data.get('password'),
    }

    if (!payload.email.includes('@') && !validateUsername(payload.email, country)) {

      setError((prevState) => ({
        ...prevState,
        display: true,
        message:  `Invalid username for ${country}`,
        error: 'error'
      }));
    } else {

      dispatch(signIN(payload, callback))

    }
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/Image/Login.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country"
                  value={country}
                  label="Country"
                  onChange={(e) =>{setCountry(e.target.value)
                    setCountr(e.target.value)
                  }}
                >
                  <MenuItem value="UAE">UAE</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email / UserName"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={()=> {navigateTo("/ForgotPassword")}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={()=> {navigateTo("/SignUp")}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}