'use client'

import React from 'react';
import Amenities from '../../components/detail/Amenities';
import Gallery from '../../components/detail/Gallery';
import { Container, Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import Overview from '@/components/detail/Overview';


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
            <Tab label="Rooms" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <Overview />
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ mt: 2 }}>
            <Amenities />
          </Box>
        )}
         {tabValue === 2 && (
          <Box sx={{ mt: 2 }}>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HotelDetail;
