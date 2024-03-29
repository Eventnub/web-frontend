import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Dialog, DialogTitle, DialogContent, Button, Typography, Stack } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';
import { usePaystackPayment } from 'react-paystack';
import stripeLogo from '../../assets/stripe-logo.png';
import paystackLogo from '../../assets/paystack-icon.png';
import useFirebase from '../../hooks/useFirebase';
import PaymentSuccessDialog from './PaymentSuccessDialog';
import { requests } from '../../api/requests';
import mixpanel from '../../utils/mixpanel';
import GoogleAnalytics from '../../utils/googleAnalytics';

const PAYSTACK_KEY = 'pk_test_6b28a0a394da79d85f0824ee2b9b366744dd9966';
const STRIPE_KEY =
  'pk_live_51NJWgPLWplPuQFeHbyHKseV2ZeGDedXX7XdMDAaBTK1eUlEV6WtVnsgnSzyxQEE8YG0r02vReuXRcBJjUKlZxAsJ000qEMzcij';

export default function SelectPaymentOption({ open, handleClose, extraPaymentData }) {
  const [isProduction, setIsProduction] = useState(false);
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

      mixpanel.track('Payment made', {
        userEmail: user.email,
        paymentService: 'stripe',
        paymentObjective: objective,
        paymentEventId: eventId,
        paymentTicketIndex: index,
      });

      GoogleAnalytics.trackEvent('Payment made', {
        userEmail: user.email,
        paymentService: 'stripe',
        paymentObjective: objective,
        paymentEventId: eventId,
        paymentTicketIndex: index,
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
      const paymentId = data.data.uid;
      localStorage.setItem('paymentId', paymentId);
    } catch (error) {
      console.log(error.request);
    }
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

        const paymentId = data.data.uid;
        localStorage.setItem('paymentId', paymentId);
        console.log(paymentId);

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
  };

  const onClose = () => {
    navigate(`/event-details/${eventId}`);
  };
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime(),
    email,
    amount: amount * 100 * 760,
    publicKey: PAYSTACK_KEY,
  });

  useEffect(() => {
    const baseUrl = window.location.origin;
    if (baseUrl.indexOf('globeventnub.com') !== -1) {
      setIsProduction(true);
    }
  }, []);

  const getStripeUI = () => (
    <StripeCheckout
      token={onToken}
      stripeKey={STRIPE_KEY}
      name="Globeventnub"
      amount={amount * 100}
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
          alignItems: 'center',
          color: '#022069',
          fontWeight: '600',
          fontSize: { xs: '1rem', md: '1.5rem' },
          height: { xs: '41px', md: '91px' },
          border: '2px solid #FF6C2C',
          '&:hover': {
            backgroundColor: '#fff',
          },
        }}
      >
        Stripe
      </Button>
    </StripeCheckout>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            background: '#fff',
            p: '1rem',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.3rem' }}>PAYMENT</Typography>
        </DialogTitle>
        {isProduction ? (
          <DialogContent>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Typography sx={{ color: '#4E4E4E', fontWeight: '400', fontSize: '1rem', mb: '1rem' }}>
                Pay with:
              </Typography>
              {getStripeUI()}
            </Box>
          </DialogContent>
        ) : (
          <DialogContent>
            <Typography sx={{ color: '#4E4E4E', fontWeight: '400', fontSize: '1rem' }}>
              Choose a payment option
            </Typography>
            <Box sx={{ background: '#F1F1F1', height: '190px', mt: '.5rem', p: '1.5rem' }}>
              <Typography sx={{ color: '#4E4E4E', fontSize: '1rem', fontWeight: '600' }}>
                How do you want to pay?
              </Typography>
              <Stack
                sx={{ mt: { xs: '1rem', md: '2rem' } }}
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, md: 4 }}
              >
                <Button
                  variant="contained"
                  endIcon={<img src={paystackLogo} alt="paystack" />}
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
                    fontSize: { xs: '1rem', md: '1.5rem' },
                    height: { xs: '41px', md: '91px' },
                    border: '2px solid #FF6C2C',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                  }}
                >
                  Paystack
                </Button>
                <Box sx={{ flex: 1 }}>{getStripeUI()}</Box>
              </Stack>
            </Box>
          </DialogContent>
        )}
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
