import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, styled, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useFirebase from '../hooks/useFirebase';
import { requests } from '../api/requests';
import QuizTakenDialog from '../components/raffle/QuizTakenDialog';
import Page from '../components/Page';
import logo from '../assets/blueLogo.png';

const StyledLabel = styled(FormControlLabel)({
  '& .MuiTypography-body1': {
    color: 'white',
    textAlign: 'center',
  },
  '& .MuiRadio-root': {
    color: '#fff',
    textAlign: 'center',
    pl: '7%',
  },
});
const StyledOption = styled(Box)({
  background: '#6EC6D2',
  height: '10%',
  width: '130px',
  borderRadius: '30px',
});
const StyledCard = styled(Box)({
  height: '80%',
  borderRadius: '10px',
  boxShadow: '0px 0px 7px 3px rgba(0, 0, 0, 0.25)',
  position: 'relative',
});

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [dialogShown, setDialogShown] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [time, setTime] = useState(1500);
  const [timerOn, setTimerOn] = useState(true);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setCurrentQuestionAnswer(value);
  };

  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const { eventId } = useParams();
  const { user } = useFirebase();

  useEffect(() => {
    if (time <= 0) {
      setTimerOn(false);
    }

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `00 : ${minutes} : ${seconds}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < 2) {
      const answer = { questionId: questions[currentQuestionIndex].uid, answer: currentQuestionAnswer };
      setAnswers([...answers, answer]);
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      if (nextQuestionIndex === 2) {
        setIsLastQuestion(true);
      }
    }

    if (isLastQuestion) {
      const answer = { questionId: questions[currentQuestionIndex].uid, answer: currentQuestionAnswer };
      setAnswers([...answers, answer]);
      setIsLastQuestion(false);
      console.log([...answers, answer]);
      const handleSubmit = async () => {
        try {
          setIsSubmitting(true);
          await requests.submitEventQuizAnswers(eventId, user.idToken, { answers: [...answers, answer] });
          setIsSubmitting(false);
          navigate('/quiz-completed');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setIsSubmitting(false);
            handleOpenDialog();
          } else {
            setErrorMessage('An error occurred. Please try again later.');
          }
        }
      };
      handleSubmit();
    }
    setCurrentQuestionAnswer('');
  };
  useEffect(() => {
    async function fetchQuestions() {
      try {
        if (user.idToken) {
          const { data } = await requests.getQuestions(eventId, user.idToken);
          setQuestions(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuestions();
  }, [user.idToken, eventId]);

  return (
    <Page title="Questions">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          px: '3%',
        }}
      >
        <Box sx={{ height: '15%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '44px', height: '44px' }} />
            <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
              eventnub
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: '35%', sm: '20%', md: '13%' },
              height: { xs: '34%', sm: '34%', md: '34%' },
              background: '#DBDBDB',
              borderRadius: '10px',
              p: '4px',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.3rem' }}>{formatTime(time)}</Typography>
          </Box>
        </Box>

        <StyledCard>
          <Typography sx={{ mt: '2%', ml: '2%', fontSize: '1.5rem', fontWeight: '600', color: '#848484' }}>
            {currentQuestionIndex + 1}/<span style={{ fontSize: '.8rem', fontWeight: '200' }}>{questions.length}</span>
          </Typography>
          {questions.length > 0 && (
            <Box sx={{ mt: '10%', textAlign: 'center' }}>
              <Typography sx={{ color: '#000', fontSize: '2rem', fontWeight: '400' }}>
                {questions[currentQuestionIndex]?.question}
              </Typography>
              <FormControl component="fieldset" sx={{ mt: '2%' }}>
                <RadioGroup>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '2rem',
                      flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                    }}
                  >
                    {questions[currentQuestionIndex]?.answerOptions?.map((option) => (
                      <StyledOption key={option}>
                        <StyledLabel
                          value={option}
                          control={
                            <Radio onChange={() => handleChange(option)} checked={option === currentQuestionAnswer} />
                          }
                          label={option}
                        />
                      </StyledOption>
                    ))}
                  </Box>
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          <LoadingButton
            variant="contained"
            loading={isSubmitting}
            sx={{
              position: 'absolute',
              bottom: '5%',
              right: '3%',
              boxShadow: 'none',
              background: '#1358A5',
              borderRadius: '5px',
              width: '10%',
            }}
            onClick={handleNext}
          >
            {currentQuestionIndex === 2 ? 'Submit' : 'Next'}
          </LoadingButton>
          <QuizTakenDialog open={dialogShown} />
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 4 }}>
              {errorMessage}
            </Alert>
          )}
        </StyledCard>
      </Box>
    </Page>
  );
}
