import PropTypes from 'prop-types';
import { Dialog, DialogContent, TextField, Typography, Box, Stack, IconButton } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';
import Image from '../Image';
import Iconify from '../Iconify';
import WelcomePhoto from '../../assets/welcome.jpg';
import { requests } from '../../api/requests';

export default function ConditionalPopup({ open, handleClose }) {
  const initialValues = {
    firstName: '',
    email: '',
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          background: '#fff',
          boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.25)',
          borderRadius: '7px',
        },
      }}
    >
      <Stack direction="row" justifyContent="end" sx={{ p: '1rem' }}>
        <IconButton aria-label="Close" onClick={handleClose}>
          <Iconify icon="eva:close-fill" width={18} height={18} />
        </IconButton>
      </Stack>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '2rem' }}>
          <Image alt="Welcome Photo" loading="lazy" src={WelcomePhoto} sx={{ width: '200px' }} />
        </Box>
        <Typography sx={{ textAlign: 'center', color: '#000', fontSize: '1rem', fontWeight: '300' }}>
          Get free updates on Afrobeat events coming to your city
        </Typography>
        <Box sx={{ mt: '8%', textAlign: 'center' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                await requests.submitEmailMarketing(values);
                setSubmitting(false);
                Swal.fire({
                  title: 'Success!',
                  text: 'Your email has been submitted.',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                  confirmButtonAttributes: {
                    href: '/',
                    target: '_self',
                  },
                });
                handleClose();
                resetForm();
              } catch (error) {
                console.log(error);
                resetForm();
              }
            }}
          >
            {({ values, errors, touched, handleChange, isSubmitting, isValid, dirty }) => (
              <Form autoComplete="off">
                <Field
                  as={TextField}
                  // size="small"
                  placeholder="First name"
                  value={values.firstName}
                  name="firstName"
                  error={touched.firstName && errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  sx={{ mb: '1rem' }}
                />
                <Field
                  as={TextField}
                  // size="small"
                  placeholder="Email"
                  value={values.email}
                  name="email"
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  sx={{ mb: '1rem' }}
                />
                <Stack direction="row" justifyContent="end">
                  <LoadingButton
                    variant="contained"
                    size="large"
                    type="submit"
                    loading={isSubmitting}
                    disabled={!(isValid && dirty)}
                    sx={{
                      boxShadow: 'none',
                      backgroundColor: '#1358A5',
                      borderRadius: '5px',
                      px: '2rem',
                    }}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

ConditionalPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
