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
import { useNavigate  } from "react-router-dom";
import { updateProfile } from '../Action/authDispatcher';
import {useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
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

export default function Profile() {
  //const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { theme, setCountry } = useThemeContext();

  const { user } = useSelector((state) => state.authReducer);


  const [profile, setProfile] = React.useState({... user});

  const [error, setError] = React.useState({display: false, error: false, message: ''})


  const callback  = (payload) => {

    if(payload.success) {

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
    let payload = {
      FirstName: data.get('firstName'),
      LastName: data.get('lastName'),
      cusTechRole: 'Customer',
      email: user.email,
      pass: data.get('password'),
      Ispromotion: data.get('promotion') ? parseInt(data.get('promotion')) : 0,
    }

    dispatch(updateProfile(payload, callback))
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={3}
        //   sx={{
        //     backgroundImage: 'url(/Image/Login.jpg)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundColor: (t) =>
        //       t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //   }}
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
              {t('update_profile')}
            </Typography>

           <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={user.FirstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label = {t('first_name')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={user.LastName}
                  required
                  fullWidth
                  id="lastName"
                  label = {t('last_name')}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={user.email}
                  required
                  fullWidth
                  disabled={true}
                  id="email"
                  label = {t('email_address')}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={user.Pass} 
                  required
                  fullWidth
                  name="password"
                  label = {t('password')}

                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox 
                  id = {'promotion'} name = {'promotion'} value= {user.Ispromotion} color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
  );
}
