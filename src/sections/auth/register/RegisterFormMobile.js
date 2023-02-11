import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select, Button, InputAdornment, Typography } from '@mui/material';
import * as Yup from 'yup';
import Iconify from '../../../components/Iconify';

const RegisterFormMobile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
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
        password: Yup.string().min(8, 'Password must be 8 characters or more').required('Password is required'),
        favoriteCelebrity: Yup.string(),
        ageRange: Yup.string().required('Age range is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
                <option value="" disabled>
                  What is your age range
                </option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
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
          <Typography textAlign={'center'} sx={{ color: '#000' }}>
            Already have an account?
          </Typography>
          <Typography variant="body2" textAlign={'center'} sx={{ color: '#000' }}>
            Sign in to discover available concerts from your favorit artist
          </Typography>
          <Button type="submit" variant="outlined" disabled={isSubmitting} sx={{ boxShadow: 'none' }}>
            Create Eventnub Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterFormMobile;
