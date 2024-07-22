  'use client'

  import React from 'react';
  import Amenities from '../../components/detail/Amenities';
  import Gallery from '../../components/detail/Gallery';
  import { Container, Box, Typography, Tabs, Tab, Paper,Rating } from '@mui/material';
  import Overview from '@/components/detail/Overview';
import Rooms from '@/components/detail/Rooms';
  import LoadingCircle from "@/components/shared/LoadingCircle";


  const HotelDetail: React.FC = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [isLoading , setIsLoading] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };

    return (
      <Box>
        <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Box mt={4}>
          <Typography variant="h3" component="h1" marginBottom={0}  gutterBottom>
            Granada Luxury Belek
          </Typography>
          <Rating name="card-rating" value={5} readOnly={true} size="medium" precision={0.5} />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Belek, Kadriye, Antalya
          </Typography>
        </Box>

        <Gallery images={[]}/>
        
        <Box sx={{ borderBottom: 1,borderColor: 'divider', mt: 2 }}>
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
                <Rooms
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                  {isLoading && (
                      <Box
                          sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              position: 'fixed',
                              top:80 ,
                              right:10,
                              left:10,
                              zIndex: 10
                          }}
                      >
                          <LoadingCircle/>
                      </Box>
                  )}
              </Box>
            )}
        </Container>
      </Box>
    );
  };

  export default HotelDetail;
