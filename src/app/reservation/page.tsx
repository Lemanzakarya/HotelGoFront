'use client';
import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Step, StepLabel, Stepper } from '@mui/material';
import GuestInformation from './GuestInformation';
import Payment from './Payment';
import { useRouter } from 'next/navigation';
import { BeginTransactionRequest } from "@/app/responsemodel/BeginTransactionModel";
import { setReservationInfo } from "@/app/responsemodel/setReservationInfoModel";
import Confirmation from '../reservation/Confirmation';
import useFormStore from '@/stores/useFormStore';

type CommitTransactionResponse = {
  body: {
    reservationNumber: string;
    encryptedReservationNumber: string;
    transactionId: string;
  }
}
type CommitTransactionRequest = {
  transactionId: string;
}

const steps = ['Guest Information', 'Payment Methods', 'Reservation Confirmation'];


const ReservationPage: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const router = useRouter();
  const [reservationNumber, setReservationNumber] = useState('');
  const [offerId, setOfferId] = useState("");
  const [hotelName, setHotelName] = useState("Hotel name could not be loaded");
  const [isFetched, setIsFetched] = useState(false);
  const formSubmitted = useFormStore(state => state.formSubmitted);
  const [hotelImg, setHotelImg] = useState("");
  const [hotelLocation, setHotelLocation] = useState("Location could not be loaded");
  const [hotelStars, setHotelStars] = useState(0);
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  }
  const fetchReservationData = async () => {

    const postData: BeginTransactionRequest = {
      offerIds: [offerId],// STATIC FIELD
      currency: "EUR",// STATIC FIELD
    }
    try {
      const setReservationResponse = await setReservationInfo(postData);
      console.log("setReservationInfo - done");
      if (setReservationResponse?.body?.reservationData?.services?.[0]?.serviceDetails?.hotelDetail?.name) {
        setHotelName(setReservationResponse.body.reservationData.services[0].serviceDetails.hotelDetail.name);
      }
      const transactionId = setReservationResponse.body.transactionId;
      console.log('transaction Id fetched');
      const commitTransactionRequest: CommitTransactionRequest = { transactionId: transactionId }
      const response = await fetch("https://localhost:7220/Tourvisio/CommitTransaction", {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commitTransactionRequest)
      })
      console.log("Commit Transaction Response status: ", response.status);

      const commitTransactionResponse: CommitTransactionResponse = await response.json();
      setReservationNumber(commitTransactionResponse.body.reservationNumber);

      setIsFetched(true);
    } catch (error) {
      console.log('ERROR: ', error);
      throw error;
    } finally {
      setIsConfirmed(true);
      setStep((prevStep) => prevStep + 1);
    }
  }
  const handleBack = () => setStep((prevStep) => prevStep - 1);


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
              p: 1,
              backgroundColor: '#ded9d9',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '300px',
            }}
          >
            {step === 0 && (
              <GuestInformation />
            )}
            {step === 1 && <Payment />}
            {step === 2 && !isConfirmed && (
              <Confirmation />)}
            {step === 3 && (
              <Box>
                <Typography variant="h1">{isFetched ? reservationNumber : "Something went wrong :("}</Typography>
                <Typography variant="h6">{isFetched ? "Please try again later" : "Congratulations"}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {reservationNumber === "Something went wrong!" ? "Your reservation could not be completed" : "Your reservation has been confirmed. Your reservation number is shown above. Please keep this number for your records."}
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
              {step > 0 && (
                  <Box sx={{ mr: 'auto' , mt:1}}>
                <Button variant="contained" onClick={handleBack} sx={{borderRadius:2 ,backgroundColor: '#f05523', '&:hover': { backgroundColor: '#ff7b55' }}}>
                  Back
                </Button>
                  </Box>
              )}
              {step < steps.length - 1 && !isConfirmed && (
                <Box sx={{ ml: 'auto' , mt:1}}>
                  <Button variant="contained" onClick={handleNext} disabled={!formSubmitted} sx={{borderRadius:2 ,backgroundColor: '#0347a8', '&:hover': { backgroundColor: '#2b73d0'}}} >
                    Next
                  </Button>
                </Box>
              )}
              {step === steps.length - 1 && !isConfirmed && (
                <Button variant="contained" onClick={fetchReservationData} sx={{borderRadius:2 ,backgroundColor: '#279d21', '&:hover': { backgroundColor: '#46a432'}}}>
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
              src={hotelImg}//FROM API
              alt="Hotel"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ mb: 2 }}>Hotel Details</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Hotel Name: {hotelName}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Location: {hotelLocation}</Typography> {/*//LOCATION TO BE FETCHED*/}
            <Typography variant="body2" sx={{ mb: 1 }}>Rating: {hotelStars}</Typography> {/*//STARS TO BE FETCHED*/}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationPage;
