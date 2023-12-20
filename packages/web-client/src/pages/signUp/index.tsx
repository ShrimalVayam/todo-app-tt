import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import {
  alreadyHaveAccount,
  bgImage,
  loginHereText,
  signUpCta,
  signUpPath,
  signUpSuccessfully,
  signUpText,
  snackSuccessString,
} from 'utils/constant';
import { getLsItem, postRequest, setLsItem } from 'utils/functions';

import CustomTextField from 'components/atoms/TextField';

import './style.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postRequest(signUpPath, formData);
      setLsItem('token', res.access_token);
      if (getLsItem('token')) {
        navigate('/login');
      }
      enqueueSnackbar(signUpSuccessfully, {
        variant: snackSuccessString,
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#ffff',
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {signUpText}
        </Typography>
        <Box sx={{ mt: 1, width: '100%', px: [6, 4, 18] }}>
          <form className='main__form' onSubmit={handleFormSubmit}>
            <FormControl
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <CustomTextField
                variant='outlined'
                fullWidth={true}
                id='email'
                fieldName='email'
                type='email'
                label='Email Address'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <CustomTextField
                variant='outlined'
                fullWidth={true}
                type='password'
                id='password'
                fieldName='password'
                label='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                {signUpCta}
              </Button>
            </FormControl>
          </form>
          <Grid container>
            <Grid container justifyContent={'center'} gap={2}>
              <Grid item sx={{ mt: 2, textAlign: 'center' }}>
                <Typography>{alreadyHaveAccount}</Typography>
                <Link to='/login'>{loginHereText}</Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
