'use client';
import React, {useEffect, useState} from 'react';
import { Box, Button, Typography, Grid, Step, StepLabel, Stepper } from '@mui/material';
import GuestInformation from './GuestInformation';
import Payment from './Payment';
import {BeginTransactionRequest, sendBeginTransactionRequest} from "@/app/responsemodel/BeginTransactionModel";
import { setReservationInfo } from "@/app/responsemodel/setReservationInfoModel";
import Confirmation from '../reservation/Confirmation';
import useOfferStore from '@/stores/useOfferStore';
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
  const {thumbnailFull,offerIds,currency} = useOfferStore();

  const [reservationNumber, setReservationNumber] = useState('');
  const { hotelName , hotelLocation } = useOfferStore();
  const [isFetched, setIsFetched] = useState(false);
  const formSubmitted = useFormStore(state => state.formSubmitted);
  const [hotelImg, setHotelImg] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSetReservationDone , setIsSetReservationDone] = useState(false);

  const handleNext = async () => {
      if (step === 0){
         await fetchSetReservationInfo();
      }
      if (isSetReservationDone){
          fetchCommitTransaction();
          if (isFetched) {

          }
      }
    setStep((prevStep) => prevStep + 1);
  }
 const handleConfirm = () => {
    if (isFetched){
        setIsConfirmed(true);
        handleNext()
    }
 }

  useEffect(() => {
    setHotelImg(thumbnailFull || '');
    fetchBeginTransaction();
  }, [offerIds, thumbnailFull]);

  const fetchBeginTransaction = async () => {
    const postData: BeginTransactionRequest = {
      offerIds: offerIds ? [offerIds[0]] : [], // STATIC FIELD
      currency: `${currency}`, // STATIC FIELD
    }
    try {
      const beginTransactionResponse = await sendBeginTransactionRequest(postData);

      setTransactionId(beginTransactionResponse.body.transactionId);
    } catch (error) {

      throw error;
    }
  }
  const fetchSetReservationInfo = async () => {
      try {
          const setReservationInfoResponse = await setReservationInfo(transactionId);
          if (!setReservationInfoResponse) {
                console.error('Server Error:', setReservationInfoResponse);
          }

          setIsSetReservationDone(true);
      }catch (e){

            throw e;
      }
  }
  const fetchCommitTransaction = async () => {
        const commitTransactionRequest: CommitTransactionRequest = { transactionId: transactionId }
        try {
            const response = await fetch("http://localhost:8080/Tourvisio/CommitTransaction", {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commitTransactionRequest)
            })
 

            const commitTransactionResponse: CommitTransactionResponse = await response.json();

            setReservationNumber(commitTransactionResponse.body.reservationNumber);
            setIsFetched(true);
        }catch (e){

            throw e;
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
              border: '2px solid #000000',
              borderRadius: '8px',
              p: 1,
              backgroundColor: '#ffffff',
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
              <Confirmation />)}
            {step === 3 && (
              <Box sx={{m:2,ml:2}}>
                <Typography variant="h2">{isFetched ? reservationNumber : "Something went wrong :("}</Typography>
                <Typography variant="h6">{isFetched ? "Congratulations" : "Please try again"}</Typography>
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
                <Button variant="contained" onClick={handleConfirm} disabled={!isFetched} sx={{borderRadius:2 ,backgroundColor: '#279d21', '&:hover': { backgroundColor: '#46a432'}}}>
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
                maxHeight:'400px',
                borderRadius: '8px',
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ mb: 2 }}>Hotel Details</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Hotel Name: {hotelName}</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>Hotel Address: {hotelLocation}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationPage;
