'use client';
import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Step, StepLabel, Stepper } from '@mui/material';
import GuestInformation from './GuestInformation';
import Payment from './Payment';
import { useRouter } from 'next/navigation';
import Confirmation from '../reservation/Confirmation';

const steps = ['Guest Information', 'Payment Methods', 'Reservation Confirmation'];


const ReservationPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const router = useRouter();

  const handleNext = () => setStep((prevStep) => prevStep + 1);

  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => router.push('/search'), 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              border: '1px solid lightgrey',
              borderRadius: '8px',
              p: 3,
              backgroundColor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '300px',
            }}
          >
            {step === 0 && (
              <GuestInformation/>
            )}
            {step === 1 && <Payment />}
            {step === 2 && !isConfirmed && (
                 <Confirmation /> )}
            {isConfirmed && (
              <Box>
                <Typography variant="h6">Congratulations!</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Your reservation has been successfully made at the hotel.
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
              {step > 0 && (
                <Button variant="outlined" onClick={handleBack}>
                  Back
                </Button>
              )}
              {step < steps.length - 1 && !isConfirmed && (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
              {step === steps.length - 1 && !isConfirmed && (
                <Button variant="contained" onClick={handleConfirm}>
                  Confirm
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              border: '1px solid lightgrey',
              borderRadius: '8px',
              p: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Box
              component="img"
              src="https://cdn-prod.travelfuse.ro/images/_top_323fce7a9d6cbbfe747e276b3276e313.jpg"
              alt="Hotel"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ mb: 2 }}>Hotel Details</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Hotel Name: Example Hotel</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Location: 123 Example St, City</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Rating: 4.5 Stars</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationPage;
