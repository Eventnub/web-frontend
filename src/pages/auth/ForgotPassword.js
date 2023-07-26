import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Link, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_AUTH } from '../../routes/paths';
import logo from '../../assets/blueLogo.png';
import { requests } from '../../api/requests';
import DialogSuccess from '../../sections/auth/login/DialogPassword';
import useIsMountedRef from '../../hooks/useIsMountedRef';

function ForgotPassword() {
  const [dialogShown, setDialogShown] = useState(false);
  const isMountedRef = useIsMountedRef();
  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          minHeight: '50%',
          width: { xs: '80%', sm: '80%', md: '35%' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Link to="/" component={RouterLink} underline="none">
            <img src={logo} alt="logo" style={{ width: '4rem', height: '4rem' }} />
          </Link>
          <Link to="/" component={RouterLink} underline="none">
            <Typography variant="h5" sx={{ color: '#1358A5', letterSpacing: '0.2rem' }}>
              eventnub
            </Typography>
          </Link>
        </Box>
        <Typography textAlign="center" sx={{ color: '#000', fontWeight: '400' }} variant="h6">
          Did you forget your password?
        </Typography>
        <Typography textAlign="center" variant="body2" sx={{ color: '#6B6B6B' }}>
          Enter the email address associated to your account and we would email you a reset link.
        </Typography>
        <Box px="0.5rem" mt="1.5rem" mb="1.5rem">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={async (values, { setErrors, setSubmitting, resetForm }) => {
              try {
                await requests.sendForgotPasswordEmail(values);
                if (isMountedRef.current) {
                  setSubmitting(false);
                  handleOpenDialog();
                  resetForm();
                }
              } catch (error) {
                if (isMountedRef.current) {
                  setErrors({ afterSubmit: error.message });
                  setSubmitting(false);
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <Field name="email">
                  {({ field, form }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      error={form.errors.email && form.touched.email}
                      placeholder="Email"
                      helperText={form.errors.email}
                      fullWidth
                    />
                  )}
                </Field>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{
                    backgroundColor: '#1358A5',
                    boxShadow: 'none',
                    height: '59px',
                    borderRadius: '5px',
                    mt: '1rem',
                  }}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Submit
                </LoadingButton>
                <DialogSuccess open={dialogShown} handleClose={handleCloseDialog} />
              </Form>
            )}
          </Formik>
        </Box>
        <Typography align="center" variant="body2">
          Do not have an account?{' '}
          <Link
            to={PATH_AUTH.register}
            component={RouterLink}
            underline="none"
            sx={{ color: '#1358A5', fontWeight: '400' }}
          >
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
