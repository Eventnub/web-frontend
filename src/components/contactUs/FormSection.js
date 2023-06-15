import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { requests } from '../../api/requests';
import mixpanel from '../../utils/mixpanel';

export default function FormSection() {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required').max(600, 'Message must be less than 600 words'),
  });
  return (
    <Box sx={{ px: '10%', mb: '8%' }}>
      <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1.5rem', mb: { xs: '7%', sm: '3%', md: '3%' } }}>
        Send us a Message
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await requests.submitContactUsMessage(values);

            mixpanel.track('Contact form submitted', {
              userName: values.name,
              userEmail: values.email,
            });

            setSubmitting(false);
            Swal.fire({
              title: 'Success!',
              text: 'Your form has been submitted.',
              icon: 'success',
              confirmButtonText: 'Okay',
              confirmButtonAttributes: {
                href: '/',
                target: '_self',
              },
            });
            resetForm();
          } catch (error) {
            console.log(error);
            resetForm();
          }
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form autoComplete="off">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                width: '100%',
                gap: { xs: '13px', sm: '3%', md: '3%' },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Field
                  as={TextField}
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  fullWidth
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Field
                  as={TextField}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  error={touched.email && errors.email}
                  fullWidth
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box sx={{ marginTop: '4%' }}>
              <Field
                as={TextField}
                placeholder="Message"
                name="message"
                value={values.message}
                error={touched.message && errors.message}
                helperText={touched.message && errors.message}
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Box style={{ position: 'absolute', bottom: '-18%', right: 0, fontSize: '.9rem' }}>
                      {values.message.length}/600
                    </Box>
                  ),
                }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: '5%' }}>
              <LoadingButton
                fullWidth
                variant="contained"
                type="submit"
                loading={isSubmitting}
                sx={{ boxShadow: 'none', backgroundColor: '#1358A5', height: '47px', borderRadius: '5px' }}
              >
                Send Message
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
