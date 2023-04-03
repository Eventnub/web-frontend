import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StripeCheckout from 'react-stripe-checkout';
import { usePaystackPayment } from 'react-paystack';
import stripeLogo from '../../assets/stripe-logo.png';
import paystackLogo from '../../assets/paystack-icon.png';
import useFirebase from '../../hooks/useFirebase';
import PaymentSuccessDialog from './PaymentSuccessDialog';
import { requests } from '../../api/requests';

export default function SelectPaymentOption({ open, handleClose, extraPaymentData }) {
  const [paymentSuccessfulDialogShown, setPaymentSuccessdulDialogShown] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { amount, objective, index } = extraPaymentData;
  const { user } = useFirebase();
  const { email } = user;

  const onToken = async (token) => {
    try {
      const data = await requests.verifyStripePayment(user.idToken, {
        paymentService: 'stripe',
        token,
        amount,
        eventId,
        ticketIndex: index,
        objective,
      });
      if (objective === 'quiz and music match') {
        navigate(`/quiz/${eventId}`);
      }
      if (objective === 'raffle draw') {
        navigate(`/raffle/${eventId}`);
      }
      if (objective === 'purchase') {
        handleOpenPaymentSuccessfulDialog();
      }

      console.log(data);
    } catch (error) {
      console.log(error.request);
    }
    console.log(token); // replace with your actual code to handle the token
    // navigate(`/quiz/${eventId}`);
  };

  const config = {
    reference: new Date().getTime(),
    email,
    amount: amount * 100,
    publicKey: 'pk_test_6b28a0a394da79d85f0824ee2b9b366744dd9966',
  };

  const handleOpenPaymentSuccessfulDialog = () => {
    setPaymentSuccessdulDialogShown(true);
  };

  const onSuccess = (response) => {
    const { reference } = response;
    const verifyPayment = async () => {
      try {
        const data = await requests.verifyTicketPayment(user.idToken, {
          paymentService: 'paystack',
          transactionReference: reference,
          amount,
          eventId,
          ticketIndex: index,
          objective,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    verifyPayment();
    if (objective === 'quiz and music match') {
      navigate(`/quiz/${eventId}`);
    }
    if (objective === 'raffle draw') {
      navigate(`/raffle/${eventId}`);
    }
    if (objective === 'purchase') {
      handleOpenPaymentSuccessfulDialog();
    }
    // } else {
    //   handleOpenDialog();
    // }
  };

  const onClose = () => {
    navigate(`/event-details/${eventId}`);
  };
  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth="true"
        maxWidth="md"
        PaperProps={{
          sx: {
            background: '#fff',
            p: '1rem',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <AddIcon />
          <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.3rem' }}>PAYMENT</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#4E4E4E', fontWeight: '400', fontSize: '1rem' }}>
            Choose a payment option
          </Typography>
          <Box sx={{ background: '#F1F1F1', height: '190px', mt: '.5rem', p: '1.5rem' }}>
            <Typography sx={{ color: '#4E4E4E', fontSize: '1rem', fontWeight: '600' }}>
              How do you want to pay?
            </Typography>
            <Box sx={{ display: 'flex', gap: '2rem', mt: '2rem' }}>
              <Button
                variant="contained"
                endIcon={<img src={paystackLogo} alt="paystack" />}
                // component={Link}
                // to={`/payment/${eventId}`}
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
                sx={{
                  borderRadius: '5px',
                  flex: 1,
                  boxShadow: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#fff',
                  color: '#022069',
                  fontWeight: '600',
                  fontSize: '1.5rem',
                  height: '91px',
                  border: '2px solid #FF6C2C',
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                }}
              >
                Paystack
              </Button>
              <Box sx={{ flex: 1 }}>
                <StripeCheckout
                  token={onToken}
                  stripeKey="pk_test_51Mpz28LArcLAwVgA09YE8VZAUFZR7NVPMUu2CMH359osn4nSZvoCO4PgZMBGtTZKK8FNmnFylvJl7OnzB9VhqdXy00u08JqhD3"
                  name="Your App Name"
                  amount={amount}
                  currency="USD"
                  allowRememberMe={false}
                >
                  <Button
                    variant="contained"
                    endIcon={<img src={stripeLogo} alt="stripe" />}
                    sx={{
                      borderRadius: '5px',
                      width: '100%',
                      boxShadow: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      background: '#fff',
                      color: '#022069',
                      fontWeight: '600',
                      fontSize: '1.5rem',
                      height: '91px',
                      border: '2px solid #FF6C2C',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                    }}
                  >
                    Stripe
                  </Button>
                </StripeCheckout>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <PaymentSuccessDialog open={paymentSuccessfulDialogShown} />
    </>
  );
}

SelectPaymentOption.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  extraPaymentData: PropTypes.object,
};
