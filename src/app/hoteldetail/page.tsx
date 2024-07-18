'use client'

import React from 'react';
import Amenities from '../../components/detail/Amenities';
import Gallery from '../../components/detail/Gallery';
import { Container, Box, Typography, Tabs, Tab, Paper } from '@mui/material';


const HotelDetail: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Granada Luxury Belek
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Belek, Kadriye, Antalya
        </Typography>
      </Box>
        <Gallery />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="hotel detail tabs">
            <Tab label="Overview" />
            <Tab label="Amenities" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            About the Hotel
          </Typography>
          <Typography variant="body1" paragraph>
            Granada Luxury Hotel Belek warmly welcomes those who want to experience a luxurious and fun-filled holiday in the unique sea and refreshing atmosphere of the Mediterranean.
          </Typography>
          <Typography variant="body1" paragraph>
          With its stylish and comfortable rooms, the facility provides a comfortable holiday experience and is located a short distance from the sea. The facility has its own sandy beach with shuttle service to the beach. With its clear sea and giant aquapark, the facility offers summer fun for guests of all ages.
          </Typography>
          <Typography variant="body1" paragraph>
          The facility stands out with its rich cuisine offering unique flavors of Turkish and world cuisines, and snack areas providing delicious snacks along with refreshing drinks throughout the day.
          </Typography>
          <Typography variant="body1" paragraph>
          Granada Luxury Hotel Belek promises an unforgettable holiday experience with its expert SPA center staff offering amenities such as a Turkish bath, indoor pool, sauna, steam room, and massage services.
          </Typography>
          <Typography variant="h6" component="div" color="primary">
              9.2 Wonderful
            </Typography>
        </Paper>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <Amenities />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HotelDetail;
