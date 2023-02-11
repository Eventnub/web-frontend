// import { Link as RouterLink } from 'react-router-dom';
// import {
//   Stack,
//   Button,
//   Card,
//   Link,
//   Divider,
//   Typography,
//   Box,
//   Avatar,
//   styled,
//   Container,
//   IconButton,
// } from '@mui/material';
// import { PATH_AUTH } from '../../routes/paths';
// import useFirebase from '../../hooks/useFirebase';
// import Page from '../../components/Page';
// import GoogleIcon from '../../assets/images/auth/google.png';
// import FacebookIcon from '../../assets/images/auth/facebook.png';
// import bg from '../../assets/background-img.png';
// import logo from '../../assets/blueLogo.png';
// import { LoginForm } from '../../sections/auth/login';

// const buttonStyle = {
//   color: 'grey.500',
//   fontWeight: 'fontWeightRegular',
// };

// const iconStyle = {
//   width: 20,
//   height: 20,
// };

// const ContentStyle = styled('div')(({ theme }) => ({
//   height: '100%',
//   margin: 'auto',
//   display: 'flex',
//   minHeight: '100vh',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   padding: theme.spacing(12, 3),
//   [theme.breakpoints.up('md')]: {
//     width: '35%',
//   },
//   [theme.breakpoints.up('lg')]: {
//     width: '30%',
//   },
// }));

// const AuthCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.common.white,
//   padding: theme.spacing(3),
// }));

// export default function Auth() {
//   const { loginWithGoogle, loginWithFacebook } = useFirebase();

//   const handleLoginGoogle = async () => {
//     try {
//       await loginWithGoogle();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLoginFacebook = async () => {
//     try {
//       await loginWithFacebook();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return ()
