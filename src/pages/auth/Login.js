import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Typography, Box, Divider, Link, Button, useMediaQuery, useTheme, Stack } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';
import Page from '../../components/Page';
import GoogleIcon from '../../assets/images/auth/google.png';
import bg from '../../assets/background-img.png';
import BlueLogo from '../../assets/blueLogo.png';
import WhiteLogo from '../../assets/Vector.png';
import { LoginForm } from '../../sections/auth/login';
import Image from '../../components/Image';

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

  return (
    <Page title="Log In">
      {isMatch ? (
        <Box display="flex" flexDirection="column" pt={3} minHeight={'100vh'}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box display="flex" flexDirection="column">
              <Link
                to="/"
                component={RouterLink}
                underline="none"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Image src={BlueLogo} alt="logo" style={{ width: '4rem', height: '4rem' }} />
                <Typography variant="h5" sx={{ color: '#1358A5', fontWeight: '700', letterSpacing: '0.1rem' }}>
                  eventnub
                </Typography>
              </Link>
              <Typography variant="h4" sx={{ textAlign: 'center', color: '#000', my: '1rem' }}>
                Sign In
              </Typography>
              <Typography variant="subtitle2" sx={{ textAlign: 'center', color: '#000', fontWeight: '100' }}>
                Continue with
              </Typography>
              <Stack direction="row" justifyContent="center" sx={{ my: '1rem' }}>
                <IconButton
                  variant="outlined"
                  sx={{ border: '1px solid #F5F5F5', borderRadius: '50%', bgcolor: 'grey.300' }}
                  onClick={handleLoginGoogle}
                >
                  <img src={GoogleIcon} alt="google icon" style={{ width: '20px', height: '20px' }} />
                </IconButton>
              </Stack>
              <Divider sx={{ my: 4, width: '100%' }}>
                <Typography variant="body2" sx={{ color: '#000', fontWeight: '500' }}>
                  OR
                </Typography>
              </Divider>
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
              <Button
                variant="outlined"
                to={PATH_AUTH.register}
                component={RouterLink}
                underline="none"
                sx={{ boxShadow: 'none', borderRadius: '5px', fontWeight: '400' }}
              >
                Create Eventnub Account
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: '1rem' }}>
              <Link
                component={RouterLink}
                variant="subtitle2"
                to={PATH_AUTH.forgetPassword}
                underline="none"
                sx={{ color: '#000', fontWeight: '500' }}
              >
                Forgot Password?
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '70%',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  my: '3rem',
                  p: '1.5rem',
                  py: '2rem',
                  width: '100%',
                  zIndex: '2',
                  bgcolor: 'rgba(80, 79, 79, 0.72)',
                }}
              >
                <Link to="/" component={RouterLink} underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image src={WhiteLogo} alt="logo" sx={{ width: '2.5rem', mr: '0.7rem' }} />
                  <Typography variant="h6" sx={{ color: '#fff', letterSpacing: '0.1em', fontsize: '2rem' }}>
                    eventnub
                  </Typography>
                </Link>
                <Box sx={{ width: '180px', my: 3 }}>
                  <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: '100', fontSize: '1rem' }}>
                    Don't have an account?
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#ffffff', fontSize: '0.8rem', pt: '1em' }}>
                    Join us and let's help you get that live concert experience
                  </Typography>
                </Box>
                <Button
                  to={PATH_AUTH.register}
                  component={RouterLink}
                  underline="none"
                  size="large"
                  variant="outlined"
                  sx={{ border: '1px solid #ffffff', color: '#ffffff', mb: 4 }}
                >
                  Create Eventnub Account
                </Button>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  position: 'absolute',
                  right: '3rem',
                  zIndex: '2',
                  width: '45%',
                  borderRadius: '0.6rem',
                  padding: '1rem',
                }}
              >
                <Typography variant="h6" sx={{ color: '#000', fontWeight: '500' }}>
                  Sign In with
                </Typography>
                <Stack justifyContent={'center'} alignItems={'center'}>
                  <IconButton
                    variant="outlined"
                    sx={{ border: '1px solid #F5F5F5', borderRadius: '50%', bgcolor: 'grey.300' }}
                    onClick={handleLoginGoogle}
                  >
                    <img src={GoogleIcon} alt="google icon" style={{ width: '20px', height: '20px' }} />
                  </IconButton>
                </Stack>
                <Divider sx={{ my: 4 }}>
                  <Typography variant="body2" sx={{ color: '#000', fontWeight: '500' }}>
                    OR
                  </Typography>
                </Divider>
                <LoginForm />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: '1rem' }}>
                  <Link
                    component={RouterLink}
                    variant="subtitle2"
                    to={PATH_AUTH.forgetPassword}
                    underline="none"
                    sx={{ color: '#000', fontWeight: '500' }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Page>
  );
}
