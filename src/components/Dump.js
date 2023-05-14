import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Box, Typography, TextField, Select, MenuItem, styled, IconButton, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../assets/blueLogo.png';
import Page from '../components/Page';
import useIsMountedRef from '../hooks/useIsMountedRef';
import { requests } from '../api/requests';
import useFirebase from '../hooks/useFirebase';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #1358A5',
      borderRadius: '5px',
    },
  },
});

const StyledSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #1358A5',
    borderRadius: '5px',
  },
});
export default function BecomeEventHost() {
  const isMountedRef = useIsMountedRef();
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
      console.log(values.phoneNumber);
      try {
        values.phoneNumber = values.phoneNumber.toString();
        await requests.changeUserToHost(user.idToken, values);
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
            Fill the details below to continue
          </Typography>
          <Box sx={{ width: '100%', mt: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Formik
              initialValues={{
                accountNumber: '',
                accountName: '',
                bankName: '',
              }}
              validationSchema={Yup.object({
                accountNumber: Yup.number().required('Account number is required'),
                accountName: Yup.string().required('Account name is required'),
                bankName: Yup.string().required('Bank is required'),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  values.accountNumber = values.accountNumber.toString();
                  await requests.changeUserToHost(user.idToken, values);
                  if (isMountedRef.current) {
                    setSubmitting(false);
                    resetForm();
                    navigate('/create-event');
                    console.log(values);
                  }
                } catch (error) {
                  if (isMountedRef.current) setSubmitting(false);
                  console.log(error);
                }
                console.log(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                  autoComplete="off"
                >
                  <Field name="accountNumber">
                    {({ field, form }) => (
                      <StyledTextField
                        {...field}
                        variant="outlined"
                        placeholder="Account Number"
                        fullWidth
                        error={form.errors.accountNumber && form.touched.accountNumber}
                        helperText={form.errors.accountNumber}
                        inputProps={{
                          type: 'number',
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                        }}
                      />
                    )}
                  </Field>
                  <Field name="accountName">
                    {({ field, form }) => (
                      <StyledTextField
                        {...field}
                        variant="outlined"
                        placeholder="Account Name"
                        error={form.errors.accountName && form.touched.accountName}
                        helperText={form.errors.accountName}
                      />
                    )}
                  </Field>

                  <Field name="bankName">
                    {({ field, form }) => (
                      <StyledSelect
                        {...field}
                        variant="outlined"
                        error={form.errors.bankName && form.touched.bankName}
                        helperText={form.errors.bankName}
                        placeholder="Select bank"
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          Select bank
                        </MenuItem>
                        {banks.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    )}
                  </Field>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    sx={{ boxShadow: 'none', backgroundColor: '#1358A5', height: '59px', borderRadius: '5px' }}
                  >
                    Continue
                  </LoadingButton>
                  {/* {errorMessage && (
                    <Alert severity="error" sx={{ mt: 4 }}>
                      {errorMessage}
                    </Alert>
                  )} */}
            {/* </Form>
              )}
            </Formik> */}
            {/* <form onSubmit={formik.handleSubmit}>
              <PhoneInput
                country={'ng'}
                value={formik.values.phoneNumber}
                onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                onBlur={formik.handleBlur}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
              />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  borderRadius: '5px',
                  mt: '1rem',
                }}
              >
                Submit
              </Button>
            </form> */}

            <form onSubmit={formik.handleSubmit}>
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
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  borderRadius: '5px',
                  mt: '1rem',
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
