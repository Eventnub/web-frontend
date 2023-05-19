import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  styled,
  CircularProgress,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useFirebase from '../hooks/useFirebase';
import { requests } from '../api/requests';
import QuizTakenDialog from '../components/raffle/QuizTakenDialog';
import Page from '../components/Page';
import CountdownTimerQuestion from '../components/CountdownTimerQuestion';
import logo from '../assets/blueLogo.png';

const StyledLabel = styled(FormControlLabel)({
  '& .MuiTypography-body1': {
    color: 'white',
    textAlign: 'center',
  },
  '& .MuiRadio-root': {
    color: '#fff',
  },
});

const StyledOption = styled(Box)({
  background: '#6EC6D2',
  height: '10%',
  // width: '130px',
  borderRadius: '30px',
  pl: '2rem',
});

const StyledCard = styled(Box)({
  height: '80%',
  borderRadius: '10px',
  boxShadow: '0px 0px 7px 3px rgba(0, 0, 0, 0.25)',
  position: 'relative',
});

const quizEndTime = Date.now() + 10 * 1000;

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [dialogShown, setDialogShown] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeElapsed, setIsTimeElapsed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setCurrentQuestionAnswer(value);
  };

  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const isNextDisabled = !currentQuestionAnswer;

  const { eventId } = useParams();
  const { user } = useFirebase();

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
      const handleSubmit = async () => {
        try {
          setIsSubmitting(true);
          await requests.submitEventQuizAnswers(eventId, user.idToken, { answers: [...answers, answer] });
          setIsSubmitting(false);
          navigate(`/music-match/${eventId}`);
        } catch (error) {
          setErrorMessage(error.response.data.message);
          setIsSubmitting(false);
          handleOpenDialog();
          console.log(error.response.data.message);
        }
      };
      handleSubmit();
    }
    setCurrentQuestionAnswer('');
  };

  const handleTimeElapsed = async () => {
    setIsTimeElapsed(true);

    if (answers.length > 0) {
      try {
        setIsSubmitting(true);
        await requests.submitEventQuizAnswers(eventId, user.idToken, { answers });
        setIsSubmitting(false);
        navigate(`/music-match/${eventId}`);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setIsSubmitting(false);
        handleOpenDialog();
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setIsLoading(true);
        if (user.idToken) {
          const { data } = await requests.getQuestions(eventId, user.idToken);
          setQuestions(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuestions();
  }, [user.idToken, eventId]);

  return (
    <Page title="Questions">
      <Stack
        sx={{
          height: '100vh',
          px: '3%',
        }}
      >
        <Stack direction="row" sx={{ height: '15%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '44px', height: '44px' }} />
            <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
              eventnub
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: '35%', md: '25%', lg: '13%' },
              height: { xs: '34%', md: '34%' },
              background: '#DBDBDB',
              borderRadius: '10px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {questions.length > 0 && (
              <CountdownTimerQuestion
                countdownDate={quizEndTime}
                isTimeElapsed={isTimeElapsed}
                onTimeElapsed={handleTimeElapsed}
              />
            )}
          </Box>
        </Stack>

        <StyledCard>
          <Typography sx={{ mt: '2%', ml: '2%', fontSize: '1.5rem', fontWeight: '600', color: '#848484' }}>
            {currentQuestionIndex + 1}/<span style={{ fontSize: '.8rem', fontWeight: '200' }}>{questions.length}</span>
          </Typography>

          <Box sx={{ mt: '10%', textAlign: 'center' }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography sx={{ color: '#000', fontSize: '2rem', fontWeight: '400' }}>
                  {questions[currentQuestionIndex]?.question}
                </Typography>
                <FormControl component="fieldset" sx={{ mt: '4%' }}>
                  <RadioGroup>
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                      {questions[currentQuestionIndex]?.answerOptions?.map((option) => (
                        <StyledOption key={option}>
                          <StyledLabel
                            value={option}
                            control={
                              <Radio
                                onChange={() => handleChange(option)}
                                checked={option === currentQuestionAnswer}
                                size="small"
                                sx={{ ml: '1rem' }}
                              />
                            }
                            label={option}
                          />
                        </StyledOption>
                      ))}
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </Box>
          {/* <Box sx={{ mt: '10%', textAlign: 'center' }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography sx={{ color: '#000', fontSize: '2rem', fontWeight: '400' }}>
                  {questions[currentQuestionIndex]?.question}
                </Typography>
                <FormControl component="fieldset" sx={{ mt: '4%' }}>
                  <RadioGroup>
                    <Grid container spacing={2}>
                      {questions[currentQuestionIndex]?.answerOptions?.map((option) => (
                        <Grid item xs={6} md={3} key={option}>
                          <StyledOption>
                            <StyledLabel
                              value={option}
                              control={
                                <Radio
                                  onChange={() => handleChange(option)}
                                  checked={option === currentQuestionAnswer}
                                  size="small"
                                  sx={{ ml: '1rem' }}
                                />
                              }
                              label={option}
                            />
                          </StyledOption>
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </Box> */}

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
            disabled={isNextDisabled}
          >
            {currentQuestionIndex === 2 ? 'Submit' : 'Next'}
          </LoadingButton>
          <QuizTakenDialog open={dialogShown} errorMessage={errorMessage} />
        </StyledCard>
      </Stack>
    </Page>
  );
}
