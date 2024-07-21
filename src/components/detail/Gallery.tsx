import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const images = [
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Genel-257544.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
];


const Gallery = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const imagesToShow = showMore ? images : images.slice(0, 5);

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={images[0]}
            alt="Main Hotel Image"
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {imagesToShow.slice(1, 5).map((image, index) => (
              <Grid item xs={12} sm={6} key={index + 1}>
                <Box
                  component="img"
                  src={image}
                  alt={`Hotel image ${index + 2}`}
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
        </Grid>
        {showMore && (
          <Grid container spacing={2}>
            {images.slice(5).map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index + 5}>
                <Box
                  component="img"
                  src={image}
                  alt={`Hotel image ${index + 6}`}
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
        )}
      </Grid>
      <Box mt={2} textAlign="center">
        <Button variant="outlined" startIcon={<PhotoCamera />} onClick={handleShowMore}>
          {showMore ? 'Show Less' : 'Show All Photos'}
        </Button>
      </Box>
    </Paper>
  );
};

export default Gallery;
