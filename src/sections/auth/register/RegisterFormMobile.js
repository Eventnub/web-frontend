import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select, Button, InputAdornment, Typography, Alert, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import Iconify from '../../../components/Iconify';
import { requests } from '../../../api/requests';
import DialogSuccess from './DialogSuccess';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

const RegisterFormMobile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isMountedRef = useIsMountedRef();
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        favoriteCelebrity: '',
        ageRange: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().min(2, 'Too short!').max(50, 'Too Long!').required('First name required'),
        lastName: Yup.string().min(2, 'Too short!').max(50, 'Too Long!').required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters long and must include at least 1 letter and 1 number')
          .required('Password is required'),
        favoriteCelebrity: Yup.string(),
        ageRange: Yup.string().required('Age range is required'),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const user = await requests.register(values);
          if (isMountedRef.current) {
            setSubmitting(false);
            handleOpenDialog();
            resetForm();
          }
          console.log(user);
        } catch (error) {
          if (isMountedRef.current) {
            setSubmitting(false);
            if (error.response && error.response.status === 400) {
              const errorMessage = error.response.data.message;
              setErrorMessage(errorMessage);
            } else {
              setErrorMessage('An error occurred. Please try again later.');
            }
          }
          console.log(error.request);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} autoComplete="off">
          <Field name="firstName">
            {({ field, form }) => (
              <TextField
                {...field}
                variant="outlined"
                placeholder="First Name"
                fullWidth
                error={form.errors.firstName && form.touched.firstName}
                helperText={form.errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:person-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
          <Field name="lastName">
            {({ field, form }) => (
              <TextField
                {...field}
                variant="outlined"
                placeholder="Last Name"
                fullWidth
                error={form.errors.lastName && form.touched.lastName}
                helperText={form.errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:person-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>

          <Field name="email">
            {({ field, form }) => (
              <TextField
                {...field}
                variant="outlined"
                error={form.errors.email && form.touched.email}
                placeholder="Email"
                fullWidth
                helperText={form.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:email-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder="Password"
                fullWidth
                error={form.errors.password && form.touched.password}
                helperText={form.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:lock-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment onClick={handleShowPassword} position="end" sx={{ cursor: 'pointer' }}>
                      <Typography variant="caption" sx={{ color: 'grey.500' }}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
          <Field name="ageRange">
            {({ field, form }) => (
              <Select
                {...field}
                variant="outlined"
                error={form.errors.ageRange && form.touched.ageRange}
                helperText={form.errors.ageRange}
                placeholder="What is your age range"
                fullWidth
                displayEmpty
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:calendar-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem disabled value="">
                  What is your age range
                </MenuItem>
                <MenuItem value="18-24">18-24</MenuItem>
                <MenuItem value="25-34">25-34</MenuItem>
                <MenuItem value="35-44">35-44</MenuItem>
                <MenuItem value="45-54">45-54</MenuItem>
                <MenuItem value="55+">55+</MenuItem>
              </Select>
            )}
          </Field>
          <Field name="favoriteCelebrity">
            {({ field, form }) => (
              <TextField
                {...field}
                variant="outlined"
                error={form.errors.favoriteCelebrity && form.touched.favoriteCelebrity}
                placeholder="Favorite Celebrity (Optional)"
                fullWidth
                helperText={form.errors.favoriteCelebrity}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:heart-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ boxShadow: 'none', backgroundColor: '#1358A5', color: '#fff', height: '51px' }}
          >
            Create Account
          </Button>
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 4 }}>
              {errorMessage}
            </Alert>
          )}
          <DialogSuccess open={dialogShown} handleClose={handleCloseDialog} />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterFormMobile;
