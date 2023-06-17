import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Typography, Box, Container, Link, Button, useMediaQuery, useTheme, Stack } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';
import Page from '../../components/Page';
import GoogleIcon from '../../assets/images/auth/google.png';
// import FacebookIcon from '../../assets/images/auth/facebook.png';
// import AppleIcon from '../../assets/apple.png';
import bg from '../../assets/background-img.png';
import logo from '../../assets/blueLogo.png';
import { LoginForm } from '../../sections/auth/login';

export default function Login() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
  const { loginWithGoogle } = useFirebase();

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
    <Page title="Log In">
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
              <Typography variant="h4" sx={{ color: '#000', ml: '1.5rem', mt: '1rem' }}>
                Sign In
              </Typography>
              <Typography variant="subtitle2" sx={{ ml: '1rem', color: '#000', fontWeight: '100' }}>
                Continue with
              </Typography>
              <Stack spacing={1} direction="row" justifyContent="center">
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
              <Typography mt={'1rem'} sx={{ color: '#000', textAlign: 'center' }}>
                OR
              </Typography>
            </Box>
          </Box>

          <Box px={{ xs: 2, md: 15 }} py={{ xs: 3, md: 10 }}>
            <LoginForm />
          </Box>
          <Box px={'1rem'}>
            <Typography textAlign={'center'} sx={{ color: '#000' }}>
              Already have an account?
            </Typography>
            <Typography variant="body2" textAlign={'center'} sx={{ color: '#000' }}>
              Sign in to discover available concerts from your favorit artist
            </Typography>
            <Box display={'flex'} alignItems={'center'} mt={'1rem'} justifyContent={'center'}>
              <Link to={PATH_AUTH.register} component={RouterLink} underline="none">
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ boxShadow: 'none', width: '289px', height: '47px', borderRadius: '5px' }}
                >
                  Create Eventnub Account
                </Button>
              </Link>
            </Box>
            <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgetPassword} underline="none">
              <Typography textAlign="center" sx={{ color: '#000', mt: 2 }}>
                Forgot Password?
              </Typography>
            </Link>
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
              <Box width={'50%'} sx={{ zIndex: '2', position: 'absolute' }}>
                <Box display="flex" flexDirection="column">
                  <Link to="/" component={RouterLink} underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="logo" />
                    <Typography variant="h6" sx={{ color: '#1358A5', letterSpacing: '0.1em', fontsize: '2rem' }}>
                      eventnub
                    </Typography>
                  </Link>
                  <Box sx={{ width: '180px', ml: 4 }}>
                    <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: '100', fontSize: '1rem' }}>
                      Don't have an account?
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: '#ffffff', fontSize: '0.8rem', pt: '1em' }}>
                      Join us and let's help you get that live concert experience
                    </Typography>
                  </Box>
                  <Box sx={{ mt: '1em', ml: 4 }}>
                    <Button
                      to={PATH_AUTH.register}
                      component={RouterLink}
                      underline="none"
                      variant="outlined"
                      sx={{ border: '1px solid #ffffff', color: '#ffffff' }}
                    >
                      Create Eventnub Account
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  height: '75vh',
                  position: 'relative',
                  left: '50%',
                  bottom: '10%',
                  zIndex: '2',
                  width: '45%',
                  borderRadius: '5px',
                }}
              >
                <Container>
                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ marginTop: '1.5rem' }}>
                    <Box>
                      <Typography variant="h5" sx={{ color: '#000', fontWeight: '600' }}>
                        Sign In
                      </Typography>
                    </Box>
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
                  <Typography align="center" my={5} variant="h6" sx={{ color: '#000' }}>
                    Or
                  </Typography>

                  <LoginForm />
                  <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgetPassword} underline="none">
                    <Typography textAlign="center" sx={{ color: '#000', mt: 2 }}>
                      Forgot Password?
                    </Typography>
                  </Link>
                </Container>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Page>
  );
}
