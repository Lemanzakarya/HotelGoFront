'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface PaymentMethodsProps {
  handleBack: () => void;
  handleNext: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ handleBack, handleNext }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [errors, setErrors] = useState({
    cardNumber: false,
    expirationDate: false,
    cvv: false,
  });

  const validateCardNumber = (number: string) => /^[0-9]{13,19}$/.test(number);

  const validateExpirationDate = (date: string) => {
    const [monthStr, yearStr] = date.split('/');
    
    // Check if the date format is MM/YY
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return false;
    }
    
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    
    // Validate month range
    if (month < 1 || month > 12) {
      return false;
    }
    
    // Calculate the full year (assuming two-digit years are in 2000s)
    const fullYear = year + 2000;
    
    // Get current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
    
    // Check if the expiration year is valid
    if (fullYear > currentYear || (fullYear === currentYear && month >= currentMonth)) {
      return true;
    }

    return false;
  };

  const validateCvv = (cvv: string) => /^[0-9]{3,4}$/.test(cvv);

  const handleSubmit = () => {
    const newErrors = {
      cardNumber: !validateCardNumber(cardNumber),
      expirationDate: !validateExpirationDate(expirationDate),
      cvv: !validateCvv(cvv),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      handleNext();
    }
  };

  return (
    <Box>
      <Typography variant="h6">Payment Methods</Typography>
      
      {/* Payment Details */}
      {paymentMethod === 'credit-card' && (
        <>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            error={errors.cardNumber}
            helperText={errors.cardNumber ? 'Invalid card number' : ''}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiration Date"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="MM/YY"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                error={errors.expirationDate}
                helperText={errors.expirationDate ? 'Invalid or expired expiration date' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                error={errors.cvv}
                helperText={errors.cvv ? 'Invalid CVV' : ''}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
          Next
        </Button>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentMethods;
