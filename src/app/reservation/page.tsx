'use client';
import React, {useState} from 'react';
import { Box, Button, Typography, Grid, Step, StepLabel, Stepper } from '@mui/material';
import GuestInformation from './GuestInformation';
import Payment from './Payment';
import { useRouter } from 'next/navigation';
import {BeginTransactionRequest} from "@/app/responsemodel/BeginTransactionModel";
import {setReservationInfo} from "@/app/responsemodel/setReservationInfoModel";
import Confirmation from '../reservation/Confirmation';
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
  const [reservationNumber ,setReservationNumber] = useState('');
  const [offerId ,setOfferId] = useState("");
  const [hotelName , setHotelName] = useState("Example Hotel Name");
  const [isFetched , setIsFetched] = useState(false);


  const handleNext = () => {
      setStep((prevStep) => prevStep + 1);
  }
  const fetchReservationData = async () => {

      const postData: BeginTransactionRequest = {
          offerIds: ["2$2$TR~^005^~23472~^005^~970.20~^005^~1473~^005^~1067.22~^005^~10fb48f4-f69b-46d5-b78b-ee6dcfcbc03f"],
          currency: "EUR" ,// STATIC FIELD
      }
      try {
          const setReservationResponse = await setReservationInfo(postData);
          console.log("setReservationInfo - done");
          if (setReservationResponse?.body?.reservationData?.services?.[0]?.serviceDetails?.hotelDetail?.name) {
              setHotelName(setReservationResponse.body.reservationData.services[0].serviceDetails.hotelDetail.name);
          }
          const transactionId = setReservationResponse.body.transactionId;
          console.log('transaction Id fetched');
          const commitTransactionRequest : CommitTransactionRequest = { transactionId: transactionId }
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
      }catch (error) {
          console.log('ERROR: ', error);
          throw error;
      }finally {
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
            {step === 3 && (
              <Box>
                  <Typography variant="h1">{isFetched ? reservationNumber : "Something went wrong :("}</Typography>
                <Typography variant="h6">{isFetched ? "Please try again later" : "Congratulations"}</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {reservationNumber=== "Something went wrong!" ? "Your reservation could not be completed" : "Your reservation has been confirmed. Your reservation number is shown above. Please keep this number for your records."}
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
                <Button variant="contained" onClick={fetchReservationData}>
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
            <Typography variant="body2" sx={{ mb: 1 }}>Hotel Name: {hotelName}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Location: 123 Example St, City</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Rating: 4.5 Stars</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationPage;
