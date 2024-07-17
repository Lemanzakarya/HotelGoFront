import React from 'react';
import { Container, Typography, Grid, Paper, IconButton, Box, Button } from '@mui/material';
import Image from 'next/image';
import Amenities from '../../components/detail/Amenities';
import Gallery from '../../components/detail/Gallery';

const HotelDetailPage: React.FC = () => {
  return (
    <Container sx={{ marginTop: '80px' }}>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Granada Luxury Belek
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Belek, Kadriye, Antalya
        </Typography>
      </Box>
      <Box mt={4}>
        <Gallery />
      </Box>
      <Box mt={4}>
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
        </Paper>
      </Box>
      <Box mt={4}>
        <Amenities />
      </Box>
    </Container>
  );
};

export default HotelDetailPage;
