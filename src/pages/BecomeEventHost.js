import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../assets/blueLogo.png';
import Page from '../components/Page';
import { requests } from '../api/requests';
import useFirebase from '../hooks/useFirebase';

export default function BecomeEventHost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useFirebase();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      try {
        values.phoneNumber = values.phoneNumber.toString();
        console.log(values.phoneNumber);
        setIsSubmitting(true);
        await requests.changeUserToHost(user.idToken, values);
        setIsSubmitting(false);
        navigate('/create-event');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Page title="Beacome Event Host">
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff',
          position: 'relative',
        }}
      >
        <IconButton component={Link} to="/" sx={{ position: 'absolute', top: '9%', right: ' 6.72%' }}>
          <CloseOutlinedIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '7%', width: '50%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '4rem', height: '4rem' }} />
            <Typography sx={{ color: '#1358A5', letterSpacing: '0.2rem', fontWeight: '800' }}>eventnub</Typography>
          </Box>
          <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.2rem', textAlign: 'center' }}>
            Become an event host
          </Typography>
          <Typography sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: '1rem', mt: '.5rem', textAlign: 'center' }}>
            Fill the detail below to continue
          </Typography>
          <Box sx={{ width: '100%', mt: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={formik.handleSubmit} style={{ width: '80%' }}>
              <PhoneInput
                inputStyle={{
                  width: '100%',
                }}
                enableSearch="true"
                disableSearchIcon="true"
                searchPlaceholder="search countries"
                specialLabel=""
                searchStyle={{
                  width: '95%',
                  padding: '8px',
                  marginBottom: '2px',
                }}
                country={'ng'}
                value={formik.values.phoneNumber}
                onChange={(value) => formik.setFieldValue('phoneNumber', value)}
              />

              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  borderRadius: '5px',
                  width: '30%',
                  margin: '1rem auto',
                  display: 'block',
                }}
              >
                Continue
              </LoadingButton>
            </form>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
