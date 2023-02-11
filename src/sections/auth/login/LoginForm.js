import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, Alert, Typography, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_AUTH } from '../../../routes/paths';
import useFirebase from '../../../hooks/useFirebase';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';

export default function LoginForm() {
  const { login } = useFirebase();
  const isMountedRef = useIsMountedRef();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const { onChange } = getFieldProps('email');
  const emailFieldProps = {
    ...getFieldProps('email'),
    onChange: (e) => {
      e.target.value = e.target.value.trim();
      onChange(e);
    },
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <InputStyle
              fullWidth
              size="large"
              placeholder="Email"
              {...emailFieldProps}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:person-outline" sx={{ color: 'text.disabled', width: 24, height: 24 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 1 }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>

          <Box>
            <InputStyle
              fullWidth
              size="large"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps('password')}
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
              sx={{ mt: 1 }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Box>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!(formik.isValid && formik.dirty)}
          sx={{ backgroundColor: '#1358A5', boxShadow: 'none', mt: '6%' }}
        >
          Login
        </LoadingButton>
        {errors.afterSubmit && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {errors.afterSubmit}
          </Alert>
        )}
      </Form>
    </FormikProvider>
  );
}
