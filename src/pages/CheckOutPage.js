import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useParams, useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import useFirebase from '../hooks/useFirebase';
import SelectGameDialog from '../components/eventDetails/SelectGameDialog';
import PaymentSuccessDialog from '../components/eventDetails/PaymentSuccessDialog';
import { requests } from '../api/requests';

export default function CheckOutPage() {
  const location = useLocation();
  const amount = location.state?.amount || null;
  const index = location.state?.index;
  const objective = location.state?.objective;
  const [dialogShown, setDialogShown] = useState(false);
  const [paymentDialogShown, setPaymentDialogShown] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { user } = useFirebase();
  const { email, idToken } = user;
  const { eventId } = useParams();
  const navigate = useNavigate();

  const config = {
    reference: new Date().getTime(),
    email,
    amount: amount * 100,
    publicKey: 'pk_test_6b28a0a394da79d85f0824ee2b9b366744dd9966',
  };

  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const handleOpenPaymentDialog = () => {
    setPaymentDialogShown(true);
  };

  const onSuccess = (response) => {
    setIsSuccessful(true);
    const { reference } = response;
    const verifyPayment = async () => {
      try {
        await requests.verifyTicketPayment(idToken, {
          paymentService: 'paystack',
          transactionReference: reference,
          eventId,
          ticketIndex: index,
          objective,
        });
      } catch (error) {
        console.log(error);
      }
    };
    verifyPayment();
    if (objective === 'to buy') {
      handleOpenPaymentDialog();
    } else {
      handleOpenDialog();
    }
  };

  const onClose = () => {
    navigate(`/event-details/${eventId}`);
  };
  const initializePayment = usePaystackPayment(config);

  if (!amount) {
    window.location.href = '/';
  }
  useEffect(() => {
    if (!isSuccessful) {
      initializePayment(onSuccess, onClose);
    }
  });
  return (
    <>
      <SelectGameDialog open={dialogShown} />;
      <PaymentSuccessDialog open={paymentDialogShown} />
    </>
  );
}
