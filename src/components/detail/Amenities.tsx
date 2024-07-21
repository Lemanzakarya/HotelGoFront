import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Pool, Wifi, DirectionsBike, LocalBar } from '@mui/icons-material';

const amenities = [
  { icon: <Pool />, name: 'Swimming Pool' },
  { icon: <Wifi />, name: 'Free WiFi' },
  { icon: <DirectionsBike />, name: 'Bike Rental' },
  { icon: <LocalBar />, name: 'Bar' },
];

const Amenities: React.FC = () => {
  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Popular Amenities
      </Typography>
      <Grid container spacing={2}>
        {amenities.map((amenity, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Paper style={{ padding: 8, textAlign: 'center' }}>
              {amenity.icon}
              <Typography variant="body1">{amenity.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Amenities;
