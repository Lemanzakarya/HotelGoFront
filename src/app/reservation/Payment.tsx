'use client';
import React, { useState } from 'react';
import { Grid, Box, Typography, TextField } from '@mui/material';


const PaymentMethods: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
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
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PaymentMethods;
