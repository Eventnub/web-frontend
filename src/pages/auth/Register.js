import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, Box, Button, useTheme, useMediaQuery, IconButton, Stack } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import useFirebase from '../../hooks/useFirebase';
import { RegisterForm } from '../../sections/auth/register';
import GoogleIcon from '../../assets/images/auth/google.png';
// import FacebookIcon from '../../assets/images/auth/facebook.png';
// import AppleIcon from '../../assets/apple.png';
import bg from '../../assets/background-img.png';
import logo from '../../assets/blueLogo.png';
import RegisterFormMobile from '../../sections/auth/register/RegisterFormMobile';

export default function Register() {
  const { loginWithGoogle } = useFirebase();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleLoginFacebook = async () => {
  //   try {
  //     await loginWithFacebook();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <Page title="Register">
      {isMatch ? (
        <Box display="flex" flexDirection="column" pt={3} minHeight={'100vh'}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" justifyContent="center">
                <Link to="/" component={RouterLink} underline="none">
                  <img src={logo} alt="logo" style={{ width: '25px', height: '25px' }} />
                </Link>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#1358A5', fontWeight: '100', fontsize: '10px', letterSpacing: '4px' }}
                >
                  eventnub
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ color: '#000', textAlign: 'center', mt: '1rem' }}>
                Sign Up
              </Typography>
              <Typography variant="subtitle2" sx={{ textAlign: 'center', color: '#000', fontWeight: '100' }}>
                Continue with
              </Typography>

              <Stack direction="row" spacing={1} justifyContent="center">
                {/* <IconButton variant="outlined" sx={{ border: '1px solid #F5F5F5', borderRadius: '20%' }}>
                  <img src={AppleIcon} alt="apple icon" style={{ width: '20px', height: '20px' }} />
                </IconButton> */}
                <IconButton
                  variant="outlined"
                  sx={{ border: '1px solid #F5F5F5', borderRadius: '20%' }}
                  onClick={handleLoginGoogle}
                >
                  <img src={GoogleIcon} alt="google icon" style={{ width: '20px', height: '20px' }} />
                </IconButton>
                {/* <IconButton
                  variant="outlined"
                  sx={{ border: '1px solid #F5F5F5', borderRadius: '20%' }}
                  onClick={handleLoginFacebook}
                >
                  <img src={FacebookIcon} alt="facebook icon" style={{ width: '20px', height: '20px' }} />
                </IconButton> */}
              </Stack>
              <Typography textAlign="center" sx={{ color: '#000' }}>
                OR
              </Typography>
            </Box>
          </Box>

          <Box px={{ xs: 2, md: 15 }} py={{ xs: 3, md: 10 }}>
            <RegisterFormMobile />
          </Box>
          <Box px="1rem">
            <Typography textAlign={'center'} sx={{ color: '#000' }}>
              Already have an account?
            </Typography>
            <Typography variant="body2" textAlign={'center'} sx={{ color: '#000', mb: '1rem' }}>
              Sign in to discover available concerts from your favorit artist
            </Typography>
            <Box display={'flex'} alignItems={'center'} mb={'1rem'} justifyContent={'center'}>
              <Link to={PATH_AUTH.login} component={RouterLink} underline="none">
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ boxShadow: 'none', width: '289px', height: '47px', borderRadius: '5px' }}
                >
                  Sign In
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundImage: `url(${bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '100vh',
              width: '100vw',
              position: 'relative',
              '&::after': {
                content: '" "',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                height: '60%',
                width: '70%',
                backgroundColor: 'rgba(80, 79, 79, 0.72)',
                display: 'flex',
              }}
            >
              <Box sx={{ width: '50%', position: 'relative' }}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    zIndex: '2',
                    minHeight: '80vh',
                    height: 'auto',
                    left: '7%',
                    bottom: '-20%',
                    borderRadius: '5px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem',
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" sx={{ color: '#000', fontWeight: '400' }}>
                      Create Account
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="subtitle2" sx={{ color: '#000', fontWeight: '100' }}>
                        With
                      </Typography>
                      {/* <IconButton variant="outlined" sx={{ border: '1px solid #F5F5F5', borderRadius: '20%' }}>
                        <img src={AppleIcon} alt="apple icon" style={{ width: '20px', height: '20px' }} />
                      </IconButton> */}
                      <IconButton
                        variant="outlined"
                        sx={{ border: '1px solid #F5F5F5', borderRadius: '20%' }}
                        onClick={handleLoginGoogle}
                      >
                        <img src={GoogleIcon} alt="google icon" style={{ width: '20px', height: '20px' }} />
                      </IconButton>
                      {/* <IconButton
                        variant="outlined"
                        sx={{ border: '1px solid #F5F5F5', borderRadius: '20%' }}
                        onClick={handleLoginFacebook}
                      >
                        <img src={FacebookIcon} alt="facebook icon" style={{ width: '20px', height: '20px' }} />
                      </IconButton> */}
                    </Box>
                  </Box>
                  <Box>
                    <RegisterForm />
                  </Box>
                </Box>
              </Box>
              <Box position="relative" zIndex="4">
                <Box marginLeft={10} display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center">
                    <Link to="/" component={RouterLink} underline="none">
                      <img src={logo} alt="logo" />
                    </Link>
                    <Typography variant="h6" sx={{ color: '#1358A5', letterSpacing: '0.1em', fontsize: '2rem' }}>
                      eventnub
                    </Typography>
                  </Box>
                  <Box sx={{ width: '180px' }}>
                    <Typography
                      variant="h4"
                      sx={{ paddingLeft: '1em', color: '#ffffff', fontWeight: '100', fontSize: '1rem' }}
                    >
                      Already have an account?
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ paddingLeft: '1.8em', color: '#ffffff', fontSize: '0.6rem', paddingTop: '1em' }}
                    >
                      Sign in to discover available concerts from your favorite artist
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: '1em', paddingLeft: '1em' }}>
                    <Link to={PATH_AUTH.login} component={RouterLink} underline="none">
                      <Button variant="outlined" sx={{ border: '1px solid #ffffff', color: '#ffffff', margin: 'auto' }}>
                        Sign In
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Page>
  );
}
