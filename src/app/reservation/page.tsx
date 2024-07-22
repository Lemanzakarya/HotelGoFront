'use client'
import React from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  paddingTop: '2rem',
});

const StepIndicator = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& span': {
      display: 'block',
      marginTop: '0.5rem',
    },
  },
  '& .active': {
    color: 'green',
    '&::before': {
      content: '""',
      display: 'block',
      width: '24px',
      height: '24px',
      backgroundColor: 'green',
      borderRadius: '50%',
      marginBottom: '0.5rem',
    },
  },
  '& .inactive': {
    color: 'gray',
    '&::before': {
      content: '""',
      display: 'block',
      width: '24px',
      height: '24px',
      backgroundColor: 'gray',
      borderRadius: '50%',
      marginBottom: '0.5rem',
    },
  },
});

const ReservationPage = () => {
  return (
    <StyledContainer>
      <StepIndicator>
        <div className="active">
          <Box></Box>
          <Typography>Your Details</Typography>
        </div>
        <div className="inactive">
          <Box></Box>
          <Typography>Final Step</Typography>
        </div>
        <div className="inactive">
          <Box></Box>
          <Typography>Instant Confirmation</Typography>
        </div>
      </StepIndicator>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" fullWidth value="Leman" disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="E-mail" fullWidth value="lemanzakaryayeva@gmail.com" disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" fullWidth value="+900531525214" disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Country" fullWidth value="Turkey" disabled />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ marginTop: '1rem' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pay Now
              </Typography>
              <Box>
                <Button variant="outlined" fullWidth>
                  Pay with ZWallet ₺ 3.678
                </Button>
                <Box sx={{ marginTop: '1rem' }}>
                  <Button variant="contained" fullWidth>
                    Secure online payment
                  </Button>
                </Box>
                <TextField label="Name on the card" fullWidth sx={{ marginTop: '1rem' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Crb Crown Residence Belek Health & Spa Hotel
              </Typography>
              <Typography>
                Address: Belek mahallesi, Belek 3 sokak no:7 iç kapı no:1 Serik/Antalya
              </Typography>
              <Box sx={{ marginTop: '1rem' }}>
                <Typography>Check-in date: After 19.07.2024 14:00</Typography>
                <Typography>Check-out date: Before 20.07.2024 12:00</Typography>
              </Box>
              <Box sx={{ marginTop: '1rem' }}>
                <Typography>1 Night, 1 Room, 2 Adult</Typography>
                <Typography>1. Room Standart Oda Breakfast included</Typography>
              </Box>
              <Box sx={{ marginTop: '1rem', backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}>
                <Typography variant="h6">Total amount you will pay ₺ 3.678</Typography>
                <Typography>All Taxes Included</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ReservationPage;
