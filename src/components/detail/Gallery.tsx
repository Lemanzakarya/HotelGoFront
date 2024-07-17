import React from 'react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const images = [
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Genel-257544.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
];

const Gallery: React.FC = () => {
  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              component="img"
              src={image}
              alt={`Hotel image ${index + 1}`}
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={2} textAlign="center">
        <Button variant="outlined" startIcon={<PhotoCamera />}>
          Show all photos
        </Button>
      </Box>
    </Paper>
  );
};

export default Gallery;
