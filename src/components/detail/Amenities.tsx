import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Pool, Wifi, DirectionsBike, LocalBar } from '@mui/icons-material';

const amenities = [
  { icon: <Pool />, name: 'Swimming Pool' },
  { icon: <Wifi />, name: 'Free WiFi' },
  { icon: <DirectionsBike />, name: 'Bike Rental' },
  { icon: <LocalBar />, name: 'Bar' },
];

type Facility = {
  name?: string;
  isPriced: boolean;
};

interface AmenitiesProps {
  facilities?: Facility[];
}

const Amenities: React.FC<AmenitiesProps> = ({ facilities }) => {
  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Popular Amenities
      </Typography>
      
      {facilities && facilities.length > 0 ? ( // Conditionally render the grid
        <Grid container spacing={2}>
          {facilities.map((facility, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Paper style={{ padding: 8, textAlign: 'center' }}>
                <Typography variant="body1">{facility.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No amenities available</Typography> 
      )}
    </Paper>
  );
};

export default Amenities;
