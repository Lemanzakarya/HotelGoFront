'use client';
import React, { useState } from 'react';
import { Box, Button, Typography, Grid, SelectChangeEvent } from '@mui/material';
import GuestInformation from './GuestInformation';
import PaymentMethods from './Payment';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const steps = ['Guest Information', 'Payment Methods', 'Reservation Confirmation'];

const countryCodes = [
  '+1',  // USA
  '+44', // UK
  '+61', // Australia
  '+49', // Germany
  '+33', // France
  '+34', // Spain
  '+39', // Italy
  '+81', // Japan
  '+86', // China
  '+91', // India
  '+90', // Turkey
];

const validateIDNumber = (idNumber: string) => {
  if (idNumber.length !== 11) return false;
  if (!/^[0-9]*$/.test(idNumber)) return false;
  return true;
};

const validatePassportNumber = (passportNumber: string) => {
  return /^[a-zA-Z0-9]{6,9}$/.test(passportNumber);
};

const ReservationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isCitizen, setIsCitizen] = useState(true);
  const [countryCode, setCountryCode] = useState('+90');
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    idNumber: '',
    gender: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
    idNumber: false,
    gender: false,
  });
  const [isConfirmed, setIsConfirmed] = useState(false); // State to handle confirmation

  const router = useRouter(); // Initialize useRouter

  const handleNext = () => {
    const errors = {
      name: formValues.name === '',
      surname: formValues.surname === '',
      email: formValues.email === '',
      phone: formValues.phone === '' || !/^[1-9][0-9]{9}$/.test(formValues.phone),
      idNumber: formValues.idNumber === '' || (isCitizen ? !validateIDNumber(formValues.idNumber) : !validatePassportNumber(formValues.idNumber)),
      gender: formValues.gender === '',
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleCitizenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCitizen(!event.target.checked);
    setFormValues((prevValues) => ({
      ...prevValues,
      idNumber: '',
    }));
  };

  const handleCountryCodeChange = (event: SelectChangeEvent<string>) => setCountryCode(event.target.value as string);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (field === 'phone') {
      value = value.replace(/^0/, ''); 
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      gender: event.target.value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      gender: false,
    }));
  };

  const validateField = (field: string) => {
    let error = false;
    let value = formValues[field as keyof typeof formValues];

    if (field === 'name' || field === 'surname' || field === 'email') {
      error = value === '';
    } else if (field === 'phone') {
      error = value === '' || !/^[1-9][0-9]{9}$/.test(value);
    } else if (field === 'idNumber') {
      error = value === '' || (isCitizen ? !validateIDNumber(value) : !validatePassportNumber(value));
    } else if (field === 'gender') {
      error = value === '';
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleConfirm = () => {
    setIsConfirmed(true); // Set confirmation state to true
    setTimeout(() => router.push('/search'), 2000); // Optional: Delay redirection for better UX
  };

  const handleNewReservation = () => {
    router.push('/search');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
          {steps.map((label, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: index + 1 === step ? 'green' : 'lightgrey',
                    color: 'white',
                    position: 'relative',
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              border: '1px solid lightgrey',
              borderRadius: '8px',
              p: 3,
              backgroundColor: '#f9f9f9',
            }}
          >
            {step === 1 && (
              <GuestInformation
                formValues={formValues}
                formErrors={formErrors}
                countryCodes={countryCodes}
                countryCode={countryCode}
                isCitizen={isCitizen}
                handleChange={handleChange}
                handleGenderChange={handleGenderChange}
                handleCitizenChange={handleCitizenChange}
                handleCountryCodeChange={handleCountryCodeChange}
                validateField={validateField}
                handleNext={handleNext}
              />
            )}

            {step === 2 && (
              <PaymentMethods
                handleBack={handleBack}
                handleNext={handleNext}
              />
            )}

            {step === 3 && !isConfirmed && (
              <Box>
                <Typography variant="h6">Reservation Confirmation</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Please review your information and confirm your reservation.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Hotel Name: Example Hotel</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Reservation Dates: Check-in Date - Check-out Date</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Amount Paid: $Amount</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleConfirm} sx={{ mr: 2 }}>
                    Confirm
                  </Button>
                  <Button variant="outlined" onClick={handleBack}>
                    Back
                  </Button>
                </Box>
              </Box>
            )}

            {isConfirmed && (
              <Box>
                <Typography variant="h6">Congratulations!</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Your reservation has been successfully made at the hotel.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleNewReservation}>
                    Start New Reservation
                  </Button>
                </Box>
              </Box>
            )}
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
