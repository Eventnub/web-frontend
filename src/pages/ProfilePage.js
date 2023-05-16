import React, { useRef, useState } from 'react';
import { Box, Button, Typography, useTheme, IconButton, Avatar, Alert } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import Resizer from 'react-image-file-resizer';
import path from 'path';
import Page from '../components/Page';
import Navbar from '../components/dashboard/Navbar';
import useFirebase from '../hooks/useFirebase';
import Footer from '../components/home/Footer';
// import image from '../assets/music-banner.png';
import { requests } from '../api/requests';

// const Text = styled(Typography)({
//   color: '#4E4E4E',
//   fontWeight: '600',
//   fontsize: '1rem',
// });

// const Title = styled(Typography)({
//   color: '#4E4E4E',
//   fontSize: '.8rem',
//   fontWeight: '400',
// });

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });

const UPLOAD_STAGE = {
  resizing: 0,
  uploading: 1,
  finished: 2,
};

export default function ProfilePage() {
  const [uploadStage, setUploadStage] = useState(null);
  const [error, setError] = useState('');
  const { user } = useFirebase();
  const theme = useTheme();
  const imageRef = useRef(null);
  const handleSelectImage = () => {
    imageRef.current.click();
  };

  const handleUpload = async (e) => {
    setError(''); // Clear any previous error

    if (!e.target.files.length) return null;
    const file = e.target.files[0];
    const fileExtension = path.extname(file.name);

    if (!['.jpg', '.jpeg', '.png'].includes(fileExtension.toLowerCase())) {
      setError(`Unsupported file format: ${fileExtension}`);
      return null;
    }

    try {
      setUploadStage(UPLOAD_STAGE.resizing);
      const resizedFile = await resizeFile(file);

      setUploadStage(UPLOAD_STAGE.uploading);
      const formData = new FormData();
      formData.append('photo', resizedFile);
      await requests.uploadUserProfilePhoto(user.idToken, formData);

      setTimeout(() => window.location.reload(), 3000);
    } catch (e) {
      setError(e.message);
    }

    setUploadStage(UPLOAD_STAGE.finished);
    return null;
  };

  const getUploadStageMessage = () => {
    switch (uploadStage) {
      case UPLOAD_STAGE.resizing:
        return 'Resizing';
      case UPLOAD_STAGE.uploading:
        return 'Uploading';
      case UPLOAD_STAGE.finished:
        return 'Done';
      default:
        return '';
    }
  };

  return (
    <Page title="User Profile">
      <Navbar />
      <Box sx={{ px: '2.2rem', height: '100vh', mt: '2%' }}>
        <Box sx={{ background: '#EDF5F6', height: '20%', borderRadius: '10px', position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              bottom: { xs: '-45%', md: '-90%' },
              pl: { xs: '30%', md: '3%' },
              width: '100%',
              // [theme.breakpoints.down('sm')]: { bottom: '-45%', pl: '30%' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <Avatar
                alt={user?.firstName}
                src={user?.photoURL}
                sx={{ height: '154px', width: '154px', border: '5px solid #fff' }}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  ml: '.4em',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  sx={{
                    color: '#000',
                    fontWeight: '600',
                    fontSize: '1.3rem',
                  }}
                >{`${user.firstName} ${user.lastName}`}</Typography>
                {user.role === 'host' && (
                  <Typography sx={{ color: '#3A3A3A', fontSize: '1rem', fontWeight: '400' }}>Event host</Typography>
                )}

                <Box>
                  {uploadStage && (
                    <Typography variant="caption" sx={{ textAlign: 'center', color: 'success.dark' }}>
                      {getUploadStageMessage()}
                    </Typography>
                  )}
                  {error && (
                    <Alert severity="error" sx={{ mt: 4 }}>
                      {error}
                    </Alert>
                  )}
                </Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={handleSelectImage}
              sx={{
                boxShadow: 'none',
                background: '#1358A5',
                width: '15%',
                [theme.breakpoints.down('sm')]: { display: 'none' },
              }}
              startIcon={<AddAPhotoOutlinedIcon />}
            >
              Update Photo
            </Button>
            <input type="file" style={{ display: 'none' }} ref={imageRef} onChange={handleUpload} />
            <IconButton
              onClick={handleSelectImage}
              sx={{ color: '#1358A5', [theme.breakpoints.up('sm')]: { display: 'none' } }}
            >
              <AddAPhotoOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        {/* <Box
          sx={{
            background: '#F8F8F8',
            mt: '12%',
            height: '18%',
            borderRadius: '10px',
            px: '3%',
            py: '1.5%',
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('sm')]: { mt: '38%', height: 'fit-content' },
          }}
        >
          <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.2rem' }}>Account Details</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: '1%',
              [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '2%',
                flex: '.6',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  width: '100%',
                },
              }}
            >
              <Box sx={{ display: 'flex', flex: '2' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                  <Text>0018816027</Text>
                  <Title>Number</Title>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    [theme.breakpoints.down('sm')]: { flex: '2', ml: '2%' },
                  }}
                >
                  <Text>Akwa Peter Uchenna</Text>
                  <Title>Name</Title>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  [theme.breakpoints.down('sm')]: { mt: '4%' },
                }}
              >
                <Text>Stanbic IBTC Bank</Text>
                <Title>Bank</Title>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                boxShadow: 'none',
                background: '#1358A5',
                width: '15%',
                [theme.breakpoints.down('sm')]: { width: '50%', alignSelf: 'flex-start', my: '4%' },
              }}
            >
              Change Account
            </Button>
          </Box>
        </Box> */}
        <Box
          sx={{
            background: '#F8F8F8',
            height: 'auto',
            mt: '10rem',
            borderRadius: '10px',
            px: '3%',
            py: '1.5%',
          }}
        >
          <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.2rem' }}>Registered Events</Typography>
          <Typography sx={{ color: '#4E4E4E', fontWeight: '400', fontSize: '.8rem' }}>
            You don’t have any registered event at the moment
          </Typography>
          {/* <Box
            sx={{
              mt: '1.5%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '3%',
              [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '261px',
                height: '218px',
              }}
            >
              <Box sx={{ height: '70%' }}>
                <img
                  src={image}
                  alt="music banner"
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '10px',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: '4%', height: 'auto', mt: '2%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', color: '#000', textAlign: 'center' }}>
                    30
                  </Typography>
                  <Typography sx={{ fontWeight: '400', fontSize: '.8rem', color: '#000', textAlign: 'center' }}>
                    JAN
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '.9rem' }}>
                    Canadian Music Festivity
                  </Typography>
                  <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.7rem' }}>
                    Short description about this concert and bla bla bla...
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '261px',
                height: '218px',
              }}
            >
              <Box sx={{ height: '70%' }}>
                <img
                  src={image}
                  alt="music banner"
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '10px',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: '4%', height: 'auto', mt: '2%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', color: '#000', textAlign: 'center' }}>
                    30
                  </Typography>
                  <Typography sx={{ fontWeight: '400', fontSize: '.8rem', color: '#000', textAlign: 'center' }}>
                    JAN
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '.9rem' }}>
                    Canadian Music Festivity
                  </Typography>
                  <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.7rem' }}>
                    Short description about this concert and bla bla bla...
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box> */}
        </Box>
      </Box>
      <Footer />
    </Page>
  );
}
