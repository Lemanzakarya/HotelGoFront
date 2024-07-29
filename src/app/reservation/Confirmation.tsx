"use client"
import React from 'react';
import useSearchStore from '../../stores/useSearchStore'; // Adjust the import path as necessary
import { Container, Typography, Box, Button } from '@mui/material';
import dayjs from 'dayjs';

const ReservationConfirmation: React.FC = () => {
  // Access store data
  const { 
    location, 
    checkInDate, 
    checkOutDate, 
    adults, 
    children, 
    selectedNationality, 
    nights 
  } = useSearchStore((state) => ({
    location: state.location,
    checkInDate: state.checkInDate,
    checkOutDate: state.checkOutDate,
    adults: state.adults,
    children: state.children,
    selectedNationality: state.selectedNationality,
    nights: state.nights,
  }));

  const formattedCheckInDate = checkInDate ? dayjs(checkInDate).format('YYYY-MM-DD') : 'N/A';
  const formattedCheckOutDate = checkOutDate ? dayjs(checkOutDate).format('YYYY-MM-DD') : 'N/A';

  return (
    <Container>
      <Box mt={1}>
        <Typography variant="h5" gutterBottom>
          Reservation Confirmation
        </Typography>
        <Typography variant="body1" paragraph>
          Please review your information and confirm your reservation.
        </Typography>
        <Box mb={2}>
          <Typography variant="h6">Location:</Typography>
          <Typography variant="body1">{location}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Reservation Dates:</Typography>
          <Typography variant="body1">
            Check-in Date: {formattedCheckInDate}
            <br />
            Check-out Date: {formattedCheckOutDate}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Number of Adults:</Typography>
          <Typography variant="body1">{adults}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Number of Children:</Typography>
          <Typography variant="body1">{children}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Nationality:</Typography>
          <Typography variant="body1">{selectedNationality}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Nights:</Typography>
          <Typography variant="body1">{nights}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ReservationConfirmation;
